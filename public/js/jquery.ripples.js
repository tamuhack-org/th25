+function ($) {

	var gl;
	var $window = $(window); // There is only one window, so why not cache the jQuery-wrapped window?
	
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	}; // Stupid Chrome
	
	function hasWebGLSupport() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		var result = context && context.getExtension('OES_texture_float') && context.getExtension('OES_texture_float_linear');
		canvas.remove();
		return result;
	}
	
	var supportsWebGL = hasWebGLSupport();

	function createProgram(vertexSource, fragmentSource, uniformValues) 
	{
		function compileSource(type, source) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
			}
			return shader;
		}
		
		var program = {};
		
		program.id = gl.createProgram();
		gl.attachShader(program.id, compileSource(gl.VERTEX_SHADER, vertexSource));
		gl.attachShader(program.id, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
		gl.linkProgram(program.id);
		if (!gl.getProgramParameter(program.id, gl.LINK_STATUS)) {
			throw new Error('link error: ' + gl.getProgramInfoLog(program.id));
		}

		// Fetch the uniform and attribute locations
		program.uniforms = {};
		program.locations = {};
		gl.useProgram(program.id);
		gl.enableVertexAttribArray(0);
		var name, type, regex = /uniform (\w+) (\w+)/g, shaderCode = vertexSource + fragmentSource;
		while ((match = regex.exec(shaderCode)) != null) {
			name = match[2];
			program.locations[name] = gl.getUniformLocation(program.id, name);
		}
		
		return program;
	}
	
	function bindTexture(texture, unit) {
		gl.activeTexture(gl.TEXTURE0 + (unit || 0));
		gl.bindTexture(gl.TEXTURE_2D, texture);
	}

	// RIPPLES CLASS DEFINITION
	// =========================

	var Ripples = function (el, options) {

		var that = this;
		
		this.$el = $(el);
		this.$el.addClass('ripples');
		
		// If this element doesn't have a background image, don't apply this effect to it
		this.$img = this.$el.find('img[data-nimg="fill"]');
		if (this.$img.length === 0) return;
		var backgroundUrl = this.$img.attr('src');
		
		this.resolution = options.resolution || 256;
		this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]);
		
		this.perturbance = options.perturbance;

		that.textures = [];
		that.framebuffers = []

		function initializeWebGLResources(that, image, canvas) {
			if (!that.context || !gl){
				console.error('No WebGL context');
				return;
			}
			gl = that.context;
			
			function isPowerOfTwo(x) {
				return (x & (x - 1)) == 0;
			}
			
			var wrapping = (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) ? gl.REPEAT : gl.CLAMP_TO_EDGE;
			
			that.backgroundWidth = image.width;
			that.backgroundHeight = image.height;
			
			var texture = gl.createTexture();
			
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapping);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapping);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			that.backgroundTexture = texture;

			for (var i = 0; i < 2; i++) {
				var texture = gl.createTexture();
				var framebuffer = gl.createFramebuffer();
				
				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
				framebuffer.width = that.resolution;
				framebuffer.height = that.resolution;
	
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, that.resolution, that.resolution, 0, gl.RGBA, gl.FLOAT, null);
	
				var renderbuffer = gl.createRenderbuffer();
				gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, that.resolution, that.resolution);
				
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
				if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
					throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
				}
				
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				
				that.textures.push(texture);
				that.framebuffers.push(framebuffer);
			}

			// Init GL stuff
			that.quad = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, that.quad);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
				-1, -1,
				+1, -1,
				+1, +1,
				-1, +1
			]), gl.STATIC_DRAW);
			
			that.initShaders();

			that.$img.on('mousemove mousedown', function(e) {
				if (!that.context) return;  // Add this check
				var rect = that.$img[0].getBoundingClientRect();
				e.offsetX = e.clientX - rect.left;
				e.offsetY = e.clientY - rect.top;
				that[e.type](e);
			});

			// Init events
			$(window).on('resize', function() {
				if (that.$img && that.$img.length) {
					if (that.$img.outerWidth() != canvas.width || that.$img.outerHeight() != canvas.height) {
						canvas.width = that.$img.outerWidth();
						canvas.height = that.$img.outerHeight();
					}
				}
			});		
			
			requestAnimationFrame(function step() {
				that.update();
				requestAnimationFrame(step);
			});
		}

		var canvas = document.createElement('canvas');
		if (!this.$img[0].complete) {
			console.log('Image not yet loaded, waiting...');
			this.$img.on('load', function() {
				console.log('Image load handler triggered');
				console.log('Background URL:', backgroundUrl);
				console.log('Image complete status:', that.$img[0].complete);
				console.log('Image natural dimensions:', that.$img[0].naturalWidth, that.$img[0].naturalHeight);
				console.log('Image loaded, initializing canvas');
				canvas.width = that.$img.outerWidth();
				canvas.height = that.$img.outerHeight();
				canvas.style.position = 'absolute';
				canvas.style.top = '0';
				canvas.style.left = '0';
				canvas.style.zIndex = '1';
				canvas.style.pointerEvents = 'auto';

				that.canvas = canvas;		


				that.$el.append(canvas);
				that.context = gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
				if (!that.context) {
					console.error('Failed to get WebGL context');
					return;
				}
				console.log('WebGL context created successfully');

				console.log('Canvas dimensions:', canvas.width, canvas.height);
				console.log('Image dimensions:', that.$img.outerWidth(), that.$img.outerHeight());
				
				// Load extensions
				var float = gl.getExtension('OES_texture_float');
				var floatLinear = gl.getExtension('OES_texture_float_linear');
				if (!float || !floatLinear) {
					console.error('Required WebGL extensions not supported');
					return;
				}
				console.log('WebGL extensions loaded successfully');

				var image = new Image;
				image.crossOrigin = 'anonymous';		
				image.onload = function() {
					initializeWebGLResources(that, image, canvas);
				};
				image.onerror = function() {
					console.error('Failed to load image:', backgroundUrl);
				};		
				image.src = backgroundUrl;
			});
			return;
		} else {
			console.log('Image already loaded, initializing immediately');
			console.log('Background URL:', backgroundUrl);
			console.log('Image complete status:', this.$img[0].complete);
			console.log('Image natural dimensions:', this.$img[0].naturalWidth, this.$img[0].naturalHeight);
			canvas.width = that.$img.outerWidth();
			canvas.height = that.$img.outerHeight();
			canvas.style.position = 'absolute';
			canvas.style.top = '0';
			canvas.style.left = '0';
			canvas.style.zIndex = '1';
			canvas.style.pointerEvents = 'auto';
			that.canvas = canvas;
			
			// Add these lines
			that.$el.append(canvas);
			that.context = gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			if (!that.context) {
				console.error('Failed to get WebGL context');
				return;
			}
			console.log('WebGL context created successfully');
			console.log('Canvas dimensions:', canvas.width, canvas.height);
			console.log('Image dimensions:', that.$img.outerWidth(), that.$img.outerHeight());

			// Load extensions
			var float = gl.getExtension('OES_texture_float');
			var floatLinear = gl.getExtension('OES_texture_float_linear');
			if (!float || !floatLinear) {
				console.error('Required WebGL extensions not supported');
				return;
			}
			console.log('WebGL extensions loaded successfully');
	
			var image = new Image;
			image.crossOrigin = 'anonymous';		
			image.onload = function() {
				initializeWebGLResources(that, image, canvas);
			};
			image.onerror = function() {
				console.error('Failed to load image:', backgroundUrl);
			};		
			image.src = backgroundUrl;
		}
		
	};

	Ripples.DEFAULTS = {
		resolution: 256,
		perturbance: 0.03
	};
	
	Ripples.prototype = {
		update: function() {
			gl = this.context;
			
			if (!this.backgroundTexture) return;
			
			this.updateTextures();
			this.render();
		},
		
		drawQuad: function() {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
			gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		},
		
		render: function() {
			gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			gl.useProgram(this.renderProgram.id);
			
			bindTexture(this.backgroundTexture, 0);
			bindTexture(this.textures[0], 1);
			
			gl.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.uniforms.topLeft);
			gl.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.uniforms.bottomRight);
			gl.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.uniforms.containerRatio);
			gl.uniform1i(this.renderProgram.locations.samplerBackground, 0);
			gl.uniform1i(this.renderProgram.locations.samplerRipples, 1);
			
			this.drawQuad();
		},

		updateTextures: function() {
			this.computeTextureBoundaries();
			
			gl.viewport(0, 0, this.resolution, this.resolution);
			
			for (var i = 0; i < 2; i++) {
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[i]);
				bindTexture(this.textures[1-i]);
				gl.useProgram(this.updateProgram[i].id);
				
				this.drawQuad();
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		},
		
		computeTextureBoundaries: function() {
			// Get image dimensions and position from the Next.js Image component
			var imageWidth = this.$img.outerWidth() || this.$el.outerWidth();
			var imageHeight = this.$img.outerHeight() || this.$el.outerHeight();
			var imageOffset = this.$img.offset() || this.$el.offset();
			
			// Get container dimensions
			var containerWidth = this.$el.outerWidth();
			var containerHeight = this.$el.outerHeight();
			
			// Calculate scale based on object-fit: contain (which we set in the Image component)
			var scale = Math.min(containerWidth / this.backgroundWidth, containerHeight / this.backgroundHeight);
			
			var backgroundWidth = this.backgroundWidth * scale;
			var backgroundHeight = this.backgroundHeight * scale;
			
			// Calculate centered position
			var backgroundX = imageOffset.left + (containerWidth - backgroundWidth) / 2;
			var backgroundY = imageOffset.top + (containerHeight - backgroundHeight) / 2;
			
			var elementOffset = this.$el.offset();
			
			this.renderProgram.uniforms.topLeft = new Float32Array([
				(elementOffset.left - backgroundX) / backgroundWidth,
				(elementOffset.top - backgroundY) / backgroundHeight
			]);
			
			this.renderProgram.uniforms.bottomRight = new Float32Array([
				this.renderProgram.uniforms.topLeft[0] + this.$el.outerWidth() / backgroundWidth,
				this.renderProgram.uniforms.topLeft[1] + this.$el.outerHeight() / backgroundHeight
			]);
			
			var maxSide = Math.max(this.canvas.width, this.canvas.height);
			
			this.renderProgram.uniforms.containerRatio = new Float32Array([
				this.canvas.width / maxSide,
				this.canvas.height / maxSide
			]);
		},
		
		
		initShaders: function() {
			var vertexShader = [
				'attribute vec2 vertex;',
				'varying vec2 coord;',
				'void main() {',
					'coord = vertex * 0.5 + 0.5;',
					'gl_Position = vec4(vertex, 0.0, 1.0);',
				'}'
			].join('\n');
			
			this.dropProgram = createProgram(vertexShader, [
				'precision highp float;',
				
				'const float PI = 3.141592653589793;',
				'uniform sampler2D texture;',
				'uniform vec2 center;',
				'uniform float radius;',
				'uniform float strength;',
				
				'varying vec2 coord;',
				
				'void main() {',
					'vec4 info = texture2D(texture, coord);',
					
					'float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);',
					'drop = 0.5 - cos(drop * PI) * 0.5;',
					
					'info.r += drop * strength;',
					
					'gl_FragColor = info;',
				'}'
			].join('\n'));
			
			this.updateProgram = [0,0];
			this.updateProgram[0] = createProgram(vertexShader, [
				'precision highp float;',
				
				'uniform sampler2D texture;',
				'uniform vec2 delta;',
				
				'varying vec2 coord;',
				
				'void main() {',
					'vec4 info = texture2D(texture, coord);',
					
					'vec2 dx = vec2(delta.x, 0.0);',
					'vec2 dy = vec2(0.0, delta.y);',
					
					'float average = (',
						'texture2D(texture, coord - dx).r +',
						'texture2D(texture, coord - dy).r +',
						'texture2D(texture, coord + dx).r +',
						'texture2D(texture, coord + dy).r',
					') * 0.25;',
					
					'info.g += (average - info.r) * 2.0;',
					'info.g *= 0.995;',
					'info.r += info.g;',
					
					'gl_FragColor = info;',
				'}'
			].join('\n'));
			gl.uniform2fv(this.updateProgram[0].locations.delta, this.textureDelta);
			
			this.updateProgram[1] = createProgram(vertexShader, [
				'precision highp float;',
				
				'uniform sampler2D texture;',
				'uniform vec2 delta;',
				
				'varying vec2 coord;',
				
				'void main() {',
					'vec4 info = texture2D(texture, coord);',
					
					'vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);',
					'vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);',
					'info.ba = normalize(cross(dy, dx)).xz;',
					
					'gl_FragColor = info;',
				'}'
			].join('\n'));
			gl.uniform2fv(this.updateProgram[1].locations.delta, this.textureDelta);
			
			this.renderProgram = createProgram([
				'precision highp float;',
				
				'attribute vec2 vertex;',
				'uniform vec2 topLeft;',
				'uniform vec2 bottomRight;',
				'uniform vec2 containerRatio;',
				'varying vec2 ripplesCoord;',
				'varying vec2 backgroundCoord;',
				'void main() {',
					'backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);',
					'backgroundCoord.y = 1.0 - backgroundCoord.y;',
					'ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;',
					'gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);',
				'}'
			].join('\n'), [
				'precision highp float;',
				
				'uniform sampler2D samplerBackground;',
				'uniform sampler2D samplerRipples;',
				'uniform float perturbance;',
				'varying vec2 ripplesCoord;',
				'varying vec2 backgroundCoord;',
				
				'void main() {',
					'vec2 offset = -texture2D(samplerRipples, ripplesCoord).ba;',
					'float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);',
					'gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;',
				'}'
			].join('\n'));
			gl.uniform1f(this.renderProgram.locations.perturbance, this.perturbance);
		},
		
		dropAtMouse: function(e, radius, strength) {
			var that = this;
			
			gl = this.context;
			
			// Update offset calculation to use the image position
			var imageOffset = this.$img.offset() || {left: 0, top: 0};
			e.offsetX = e.offsetX || (e.pageX - imageOffset.left);
			e.offsetY = e.offsetY || (e.pageY - imageOffset.top);
		
			// Use image dimensions instead of container dimensions
			var imageWidth = this.$img.outerWidth() || this.$el.outerWidth();
			var imageHeight = this.$img.outerHeight() || this.$el.outerHeight();
			var longestSide = Math.max(imageWidth, imageHeight);
			
			var dropPosition = new Float32Array([
				(2 * e.offsetX - imageWidth) / longestSide, 
				(imageHeight - 2 * e.offsetY) / longestSide
			]);
		
			gl.viewport(0, 0, this.resolution, this.resolution);
			
			// Rest of the WebGL rendering code remains the same
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[0]);
			bindTexture(this.textures[1]);
			gl.useProgram(this.dropProgram.id);
			gl.uniform2fv(this.dropProgram.locations.center, dropPosition);
			gl.uniform1f(this.dropProgram.locations.radius, radius);
			gl.uniform1f(this.dropProgram.locations.strength, strength);
			
			this.drawQuad();
			
			// Texture swapping remains the same
			var t = this.framebuffers[0]; this.framebuffers[0] = this.framebuffers[1]; this.framebuffers[1] = t;
			t = this.textures[0]; this.textures[0] = this.textures[1]; this.textures[1] = t;
			
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		},
		
		mousemove: function(e) {
			this.dropAtMouse(e, 0.03, 0.01);
		},
		
		mousedown: function(e) {
			this.dropAtMouse(e, 0.09, 0.14);
		},
	};

	// RIPPLES PLUGIN DEFINITION
	// ==========================

	var old = $.fn.ripples;

	$.fn.ripples = function(option) {
		return this.each(function() {
			if (!supportsWebGL) throw new Error('Your browser does not support at least one of the following: WebGL, OES_texture_float extension, OES_texture_float_linear extension.');
			
			var $this   = $(this);
			var data    = $this.data('ripples');
			var options = $.extend({}, Ripples.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data) 
				$this.data('ripples', new Ripples(this, options));
		});
	}

	$.fn.ripples.Constructor = Ripples;


	// RIPPLES NO CONFLICT
	// ====================

	$.fn.ripples.noConflict = function() {
		$.fn.ripples = old;
		return this;
	}

}(window.jQuery);