+(function ($) {
    var gl;
    var $window = $(window); // There is only one window, so why not cache the jQuery-wrapped window?

    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    }; // Stupid Chrome

    function hasWebGLSupport() {
        var canvas = document.createElement('canvas');
        console.log('Checking WebGL support...');
        try {
            var context =
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl');
            if (!context) {
                console.error('WebGL context not available');
                return false;
            }
            var result =
                context &&
                context.getExtension('OES_texture_float') &&
                context.getExtension('OES_texture_float_linear');
            console.log('WebGL Support:', {
                hasContext: !!context,
                hasFloat: !!context?.getExtension('OES_texture_float'),
                hasLinear: !!context?.getExtension('OES_texture_float_linear'),
            });
            return result;
        } catch (e) {
            console.error('WebGL support check failed:', e);
            return false;
        } finally {
            canvas?.remove();
        }
    }

    var supportsWebGL = hasWebGLSupport();

    function createProgram(vertexSource, fragmentSource, uniformValues) {
        if (!gl) {
            console.error('No WebGL context available');
            return null;
        }

		// Add context state validation
		if (gl.isContextLost()) {
			console.error('WebGL context is lost');
			return null;
		}

        function compileSource(type, source) {
            var shader = gl.createShader(type);
			if (!shader) {
				console.error('Failed to create shader');
				return null;
			}
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(
                    'compile error: ' + gl.getShaderInfoLog(shader),
                );
            }
            return shader;
        }
        try {
            var program = {};

            program.id = gl.createProgram();

            // Add location validation
            program.getUniformLocation = function (name) {
                var location = gl.getUniformLocation(this.id, name);
                if (!location) {
                    console.error('Unable to get uniform location: ' + name);
                }
                return location;
            };
            gl.attachShader(
                program.id,
                compileSource(gl.VERTEX_SHADER, vertexSource),
            );
            gl.attachShader(
                program.id,
                compileSource(gl.FRAGMENT_SHADER, fragmentSource),
            );
            gl.linkProgram(program.id);
            if (!gl.getProgramParameter(program.id, gl.LINK_STATUS)) {
                var info = gl.getProgramInfoLog(program.id);
                throw new Error('Could not compile WebGL program. \n\n' + info);
            }

            // Fetch the uniform and attribute locations
            program.uniforms = {};
            program.locations = {};
            gl.useProgram(program.id);
            gl.enableVertexAttribArray(0);
            var name,
                type,
                regex = /uniform (\w+) (\w+)/g,
                shaderCode = vertexSource + fragmentSource;
            while ((match = regex.exec(shaderCode)) != null) {
                name = match[2];
                program.locations[name] = gl.getUniformLocation(
                    program.id,
                    name,
                );
            }

            return program;
        } catch (e) {
            console.error('Program creation failed:', e);
            return null;
        }
    }

    function bindTexture(texture, unit) {
        if (!gl || !texture) {
            console.error('Invalid texture or WebGL context');
            return;
        }
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
        this.$img = this.$el;
        if (!this.$img.prop('src')) {
            console.error('No image source found');
            return;
        }
        var backgroundUrl = this.$img.prop('src');
        console.log('Ripples constructor called with:', {
            element: el,
            hasImage: !!this.$img.length,
            imageComplete: this.$img[0]?.complete,
            backgroundUrl: backgroundUrl,
        });

        this.resolution = options.resolution || 256;
        this.textureDelta = new Float32Array([
            1 / this.resolution,
            1 / this.resolution,
        ]);

        this.perturbance = options.perturbance;

        that.textures = [];
        that.framebuffers = [];

        function initializeWebGLResources(that, image, canvas) {
            if (!that.$img[0].naturalWidth || !that.$img[0].naturalHeight) {
                console.error('Invalid image dimensions');
                return;
            }
            if (!that.context || !gl) {
                console.error('No WebGL context');
                return;
            }
            gl = that.context;

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            function isPowerOfTwo(x) {
                return (x & (x - 1)) == 0;
            }

            var wrapping =
                isPowerOfTwo(image.width) && isPowerOfTwo(image.height)
                    ? gl.REPEAT
                    : gl.CLAMP_TO_EDGE;

            that.backgroundWidth = that.$img[0].naturalWidth;
            that.backgroundHeight = that.$img[0].naturalHeight;

            var texture = gl.createTexture();
            if (!texture) {
                console.error('Failed to create texture');
                return;
            }

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapping);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapping);
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image,
            );

            that.backgroundTexture = texture;

            for (var i = 0; i < 2; i++) {
                var texture = gl.createTexture();
                var framebuffer = gl.createFramebuffer();

                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                framebuffer.width = that.resolution;
                framebuffer.height = that.resolution;

                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_MIN_FILTER,
                    gl.LINEAR,
                );
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_MAG_FILTER,
                    gl.LINEAR,
                );
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_WRAP_S,
                    gl.CLAMP_TO_EDGE,
                );
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_WRAP_T,
                    gl.CLAMP_TO_EDGE,
                );
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    that.resolution,
                    that.resolution,
                    0,
                    gl.RGBA,
                    gl.FLOAT,
                    null,
                );

                var renderbuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
                gl.renderbufferStorage(
                    gl.RENDERBUFFER,
                    gl.DEPTH_COMPONENT16,
                    that.resolution,
                    that.resolution,
                );

                gl.framebufferTexture2D(
                    gl.FRAMEBUFFER,
                    gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_2D,
                    texture,
                    0,
                );
                gl.framebufferRenderbuffer(
                    gl.FRAMEBUFFER,
                    gl.DEPTH_ATTACHMENT,
                    gl.RENDERBUFFER,
                    renderbuffer,
                );
                if (
                    gl.checkFramebufferStatus(gl.FRAMEBUFFER) !=
                    gl.FRAMEBUFFER_COMPLETE
                ) {
                    throw new Error(
                        'Rendering to this texture is not supported (incomplete framebuffer)',
                    );
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
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, +1, -1, +1, +1, -1, +1]),
                gl.STATIC_DRAW,
            );

            that.initShaders();

            that.$img.on('mousemove mousedown', function (e) {
                if (!that.context || !gl) return;
                var rect = that.$img[0].getBoundingClientRect();
                var scale = that.$img[0].naturalWidth / rect.width;
                e.offsetX = (e.clientX - rect.left) * scale;
                e.offsetY = (e.clientY - rect.top) * scale;
                that[e.type](e);
            });

            // Init events
            $(window).on('resize', function () {
                if (that.$img && that.$img[0].complete) {
                    canvas.width = that.$img[0].naturalWidth;
                    canvas.height = that.$img[0].naturalHeight;
                }
            });

            requestAnimationFrame(function step() {
                console.log('Animation frame');
                that.update();
                requestAnimationFrame(step);
            });
        }

		function setupCanvas(that, width, height) {
			if (!width || !height) {
				console.error('Invalid canvas dimensions:', width, height);
				return null;
			}
			try {
				var canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				canvas.style.position = 'absolute';
				canvas.style.top = '0';
				canvas.style.left = '0';
				canvas.style.zIndex = '100';
				canvas.style.pointerEvents = 'none';
				canvas.style.mixBlendMode = 'multiply';
				that.canvas = canvas;
				that.$el.css('position', 'relative');  // Ensure proper positioning context
				that.$el.append(canvas);
				return canvas;
			} catch (e) {
				console.error('Failed to create canvas:', e);
				return null;
			}
		}	

        function initWebGLContext(canvas) {
            if (!canvas) {
                console.error('Invalid canvas element');
                return null;
            }
            var context =
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl');
            if (!context) {
                console.error('Failed to get WebGL context');
                return null;
            }

            // Enable alpha blending
            context.enable(context.BLEND);
            context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
            console.log('WebGL context created successfully');
            console.log('WebGL Context Creation:', {
                success: !!context,
                canvas: {
                    width: canvas.width,
                    height: canvas.height,
                },
            });
            var float = context.getExtension('OES_texture_float');
            var floatLinear = context.getExtension('OES_texture_float_linear');
            if (!float || !floatLinear) {
                console.error('Required WebGL extensions not supported');
                return null;
            }
            console.log('WebGL extensions loaded successfully');
            return context;
        }

        var canvas = document.createElement('canvas');
        if (!this.$img[0].complete || !this.$img[0].naturalWidth) {
            console.log('Image not yet loaded, waiting...');
            this.$img.on('load', function () {
                console.log('Image load handler triggered');
                console.log('Background URL:', backgroundUrl);
                console.log('Image complete status:', that.$img[0].complete);
                console.log(
                    'Image natural dimensions:',
                    that.$img[0].naturalWidth,
                    that.$img[0].naturalHeight,
                );
                console.log('Image loaded, initializing canvas');
                canvas = setupCanvas(
                    that,
                    that.$img[0].naturalWidth,
                    that.$img[0].naturalHeight,
                );
                if (!canvas) {
                    console.error('Failed to setup canvas');
                    return;
                }
                that.context = gl = initWebGLContext(canvas);

                console.log('Canvas dimensions:', canvas.width, canvas.height);
                console.log(
                    'Image dimensions:',
                    that.$img[0].naturalWidth,
                    that.$img[0].naturalHeight,
                );

                var image = new Image();
                image.crossOrigin = 'anonymous';
                image.onload = function () {
                    if (
                        !that.$img[0].naturalWidth ||
                        !that.$img[0].naturalHeight
                    ) {
                        console.error('Invalid image dimensions');
                        return;
                    }
                    console.log('Background image loaded:', {
                        width: image.width,
                        height: image.height,
                        hasContext: !!that.context,
                    });
                    initializeWebGLResources(that, image, canvas);
                };
                image.onerror = function () {
                    console.error('Failed to load image:', backgroundUrl);
                };
                image.src = backgroundUrl;
            });
            return;
        } else {
            console.log('Image already loaded, initializing immediately');
            console.log('Background URL:', backgroundUrl);
            console.log('Image complete status:', this.$img[0].complete);
            console.log(
                'Image natural dimensions:',
                this.$img[0].naturalWidth,
                this.$img[0].naturalHeight,
            );
            canvas = setupCanvas(
                that,
                that.$img[0].naturalWidth,
                that.$img[0].naturalHeight,
            );
            if (!canvas) {
                console.error('Failed to setup canvas');
                return;
            }
            that.context = gl = initWebGLContext(canvas);

            console.log('Canvas dimensions:', canvas.width, canvas.height);
            console.log(
                'Image dimensions:',
                that.$img[0].naturalWidth,
                that.$img[0].naturalHeight,
            );

            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = function () {
                if (!that.$img[0].naturalWidth || !that.$img[0].naturalHeight) {
                    console.error('Invalid image dimensions');
                    return;
                }
                console.log('Background image loaded:', {
                    width: image.width,
                    height: image.height,
                    hasContext: !!that.context,
                });
                initializeWebGLResources(that, image, canvas);
            };
            image.onerror = function () {
                console.error('Failed to load image:', backgroundUrl);
            };
            image.src = backgroundUrl;
        }
    };

    Ripples.DEFAULTS = {
        resolution: 256,
        perturbance: 0.03,
    };

    Ripples.prototype = {
        update: function () {
            if (!this.context) {
                console.error('No WebGL context');
                return;
            }
            gl = this.context;

            if (!this.backgroundTexture) {
                console.error('No background texture');
                return;
            }

            this.updateTextures();
            this.render();
        },

        drawQuad: function () {
            if (!this.quad) {
                console.error('No quad buffer');
                return;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        },

        render: function () {
            if (!this.context || !gl) {
                console.error('No WebGL context');
                return;
            }

            gl = this.context;

            // Validate uniforms
            if (
                !this.renderProgram.uniforms ||
                !this.renderProgram.uniforms.topLeft ||
                !this.renderProgram.uniforms.bottomRight
            ) {
                console.error('Missing uniform values');
                return;
            }

            gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            if (!this.renderProgram || !this.renderProgram.id) {
                console.error('Invalid render program');
                return;
            }

            console.log('Rendering frame'); // Add this

            gl.useProgram(this.renderProgram.id);
            var locations = this.renderProgram.locations;
            if (
                !locations.topLeft ||
                !locations.bottomRight ||
                !locations.containerRatio
            ) {
                console.error('Missing uniform locations');
                return;
            }

            bindTexture(this.backgroundTexture, 0);
            bindTexture(this.textures[0], 1);

            gl.uniform2fv(
                this.renderProgram.locations.topLeft,
                this.renderProgram.uniforms.topLeft,
            );
            gl.uniform2fv(
                this.renderProgram.locations.bottomRight,
                this.renderProgram.uniforms.bottomRight,
            );
            gl.uniform2fv(
                this.renderProgram.locations.containerRatio,
                this.renderProgram.uniforms.containerRatio,
            );
            gl.uniform1i(this.renderProgram.locations.samplerBackground, 0);
            gl.uniform1i(this.renderProgram.locations.samplerRipples, 1);

            this.drawQuad();
        },

        updateTextures: function () {
            if (!gl || !this.framebuffers || !this.textures) {
                console.error('Invalid WebGL resources');
                return;
            }
            this.computeTextureBoundaries();

            gl.viewport(0, 0, this.resolution, this.resolution);

            for (var i = 0; i < 2; i++) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[i]);
                bindTexture(this.textures[1 - i]);
                gl.useProgram(this.updateProgram[i].id);

                this.drawQuad();
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        },

        computeTextureBoundaries: function () {
            if (!this.$img[0].naturalWidth || !this.$img[0].naturalHeight) {
                console.error('Invalid image dimensions');
                return;
            }
            // Get image dimensions from natural dimensions
            var imageWidth = this.$img[0].naturalWidth;
            var imageHeight = this.$img[0].naturalHeight;
            var imageOffset = this.$img.offset();
            if (!imageOffset) {
                console.error('Invalid image offset');
                return;
            }

            // Get container dimensions
            var containerWidth = imageWidth; // Use natural width
            var containerHeight = imageHeight; // Use natural height

            if (!containerWidth || !containerHeight) {
                console.error('Invalid container dimensions');
                return;
            }

            // Calculate scale based on object-fit: contain (which we set in the Image component)
            var scale = 1.0;
            if (this.lastScale && Math.abs(this.lastScale - scale) < 0.001)
                return;
            this.lastScale = scale;

            console.log('Texture Boundaries:', {
                imageWidth,
                imageHeight,
                containerWidth,
                containerHeight,
                scale,
            });

            var backgroundWidth = imageWidth;
            var backgroundHeight = imageHeight;

            // Calculate centered position
            var backgroundX =
                imageOffset.left +
                (containerWidth - backgroundWidth * scale) / 2;
            var backgroundY =
                imageOffset.top +
                (containerHeight - backgroundHeight * scale) / 2;

            var elementOffset = this.$el.offset();

            this.renderProgram.uniforms.topLeft = new Float32Array([
                (elementOffset.left - backgroundX) / backgroundWidth,
                (elementOffset.top - backgroundY) / backgroundHeight,
            ]);

            this.renderProgram.uniforms.bottomRight = new Float32Array([
                this.renderProgram.uniforms.topLeft[0] +
                    this.$el.outerWidth() / backgroundWidth,
                this.renderProgram.uniforms.topLeft[1] +
                    this.$el.outerHeight() / backgroundHeight,
            ]);

            var maxSide = Math.max(this.canvas.width, this.canvas.height);

            this.renderProgram.uniforms.containerRatio = new Float32Array([
                this.canvas.width / maxSide,
                this.canvas.height / maxSide,
            ]);
        },

        initShaders: function () {
            if (!this.context || !gl) {
                console.error('No WebGL context available');
                return;
            }
            try {
                // Create vertex shader
                var vertexShader = [
                    'attribute vec2 vertex;',
                    'varying vec2 coord;',
                    'void main() {',
                    'coord = vertex * 0.5 + 0.5;',
                    'gl_Position = vec4(vertex, 0.0, 1.0);',
                    '}',
                ].join('\n');

                // Initialize programs with error checking
                this.dropProgram = createProgram(
                    vertexShader,
                    [
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
                        '}',
                    ].join('\n'),
                );
                if (!this.dropProgram) {
                    throw new Error('Failed to create drop program');
                }

                this.updateProgram = [0, 0];
                this.updateProgram[0] = createProgram(
                    vertexShader,
                    [
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
                        '}',
                    ].join('\n'),
                );

                gl.useProgram(this.updateProgram[0].id);
                var deltaLocation = gl.getUniformLocation(
                    this.updateProgram[0].id,
                    'delta',
                );
                if (deltaLocation) {
                    gl.uniform2fv(deltaLocation, this.textureDelta);
                }

                this.updateProgram[1] = createProgram(
                    vertexShader,
                    [
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
                        '}',
                    ].join('\n'),
                );

                gl.useProgram(this.updateProgram[1].id);
                deltaLocation = gl.getUniformLocation(
                    this.updateProgram[1].id,
                    'delta',
                );
                if (deltaLocation) {
                    gl.uniform2fv(deltaLocation, this.textureDelta);
                }

                this.renderProgram = createProgram(
                    [
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
                        '}',
                    ].join('\n'),
                    [
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
                        '}',
                    ].join('\n'),
                );
                gl.useProgram(this.renderProgram.id);
                var perturbanceLocation = gl.getUniformLocation(
                    this.renderProgram.id,
                    'perturbance',
                );
                if (perturbanceLocation) {
                    gl.uniform1f(perturbanceLocation, this.perturbance);
                }
            } catch (e) {
                console.error('Shader initialization failed:', e);
                return;
            }
        },

        dropAtMouse: function (e, radius, strength) {
            console.log('Drop at mouse:', e.offsetX, e.offsetY);
            if (!this.dropProgram || !this.dropProgram.id) {
                console.error('Invalid drop program');
                return;
            }

            if (!this.context || !gl) {
                console.error('No WebGL context');
                return;
            }

            gl = this.context;

            // Update offset calculation to use the image position
            var imageOffset = this.$img.offset() || { left: 0, top: 0 };
            e.offsetX = e.offsetX || e.pageX - imageOffset.left;
            e.offsetY = e.offsetY || e.pageY - imageOffset.top;

            // Use image dimensions instead of container dimensions
            var imageWidth = this.$img[0].naturalWidth;
            var imageHeight = this.$img[0].naturalHeight;
            if (!imageWidth || !imageHeight) {
                console.error('Invalid image dimensions');
                return;
            }
            var longestSide = Math.max(imageWidth, imageHeight);

            var dropPosition = new Float32Array([
                (2 * e.offsetX - imageWidth) / longestSide,
                (imageHeight - 2 * e.offsetY) / longestSide,
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
            var t = this.framebuffers[0];
            this.framebuffers[0] = this.framebuffers[1];
            this.framebuffers[1] = t;
            t = this.textures[0];
            this.textures[0] = this.textures[1];
            this.textures[1] = t;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        },

        mousemove: function (e) {
            this.dropAtMouse(e, 0.03, 0.01);
        },

        mousedown: function (e) {
            this.dropAtMouse(e, 0.09, 0.14);
        },
    };

    // RIPPLES PLUGIN DEFINITION
    // ==========================

    var old = $.fn.ripples;

    $.fn.ripples = function (option) {
        return this.each(function () {
            if (!supportsWebGL) {
                console.error('WebGL not supported');
                return;
            }

            var $this = $(this);
            if (!$this.prop('src')) {
                console.error('No image source found');
                return;
            }

            var options = $.extend(
                {},
                Ripples.DEFAULTS,
                $this.data(),
                typeof option == 'object' && option,
            );

            if (!$this.data('ripples')) {
                $this.data('ripples', new Ripples(this, options));
            }
        });
    };

    $.fn.ripples.Constructor = Ripples;

    // RIPPLES NO CONFLICT
    // ====================

    $.fn.ripples.noConflict = function () {
        $.fn.ripples = old;
        return this;
    };
})(window.jQuery);
