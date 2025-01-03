import localFont from "next/font/local";
import Image from "next/image";
import rainman from "../../public/rainman.png";

const swily = localFont({ src: '../pages/fonts/SwilyBright.otf' });

const Prizes = () => {

  return (
    <div className="flex flex-col w-full gap-48 pb-48">
      <svg width="960" height="1359" viewBox="0 0 960 1359" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M949.5 -0.5C822.5 614.5 369.5 502.995 369.5 502.995C-26.5003 377.408 501.478 207.482 501.479 369.183C501.48 468.683 -219.5 894 86.4998 1349" stroke="white" stroke-opacity="0.55" stroke-width="20" stroke-linecap="round" />
      </svg>
      <div className="flex w-full justify-end -mt-72">
        <div className="bg-[rgb(255,255,255,0.15)] border border-white p-4 grid grid-cols-4 gap-4 w-full -skew-x-3 -skew-y-3 -rotate-3 -mr-16" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="col-span-4 bg-[#F5BFE4] p-8 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-48" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-6xl lg:text-8xl`}>1st Place Software</h2>
              <p className="font-semibold text-2xl">First place software track.</p>
              <p className="text-lg font-medium">Prize: Electric Scooter</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-5xl`}>2nd Place Software</h2>
              <p className="font-medium text-lg">Second place software track.</p>
              <p>Prize: Sony XM4 Headphones</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-5xl`}>3rd Place Software</h2>
              <p className="font-medium text-lg">Third place software track.</p>
              <p>Prize: 165Hz Monitors</p>
            </div>
          </div>
          <div className="col-span-4">
            <div className="col-span-3 gap-4 grid grid-cols-3 font-poppins w-full">
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>Best Design</h2>
                    <p>In the world of hacking and engineering, a product must not only work well, but also provide the best user experience possible. Best hack that demonstrates clear design and usability intentions.</p>
                  </div>
                  <p>Prize: KODAK Portable Photo Printer</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>Best Beginner Software Hack</h2>
                    <p>Best software hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)</p>
                  </div>
                  <p>Prize: JBL Clip 5 Bluetooth Speaker</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>American Airlines Challenge</h2>
                    <p>More details coming soon!</p>
                  </div>
                  <p>Prize: TBA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <div className="bg-[rgb(255,255,255,0.15)] border border-white p-4 grid grid-cols-4 gap-4 w-full skew-x-3 skew-y-3 rotate-3 -ml-16" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="col-span-4 bg-[#F5BFE4] p-8 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-48" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-6xl lg:text-8xl`}>1st Place Hardware</h2>
              <p className="font-semibold text-2xl">First place hardware track.</p>
              <p className="text-lg font-medium">Prize: Amazon Smart TV</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-5xl`}>2nd Place Hardware</h2>
              <p className="font-medium text-lg">Second place hardware track.</p>
              <p>Prize: Raspberry Pi 4</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className={`${swily.className} font-semibold text-5xl`}>3rd Place Hardware</h2>
              <p className="font-medium text-lg">Third place hardware track.</p>
              <p>Prize: Drone with Camera</p>
            </div>
          </div>
          <div className="col-span-4">
            <div className="col-span-3 gap-4 grid grid-cols-3 font-poppins w-full">
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>Best Beginner Hardware Hack</h2>
                    <p>Best hardware hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)</p>
                  </div>
                  <p>Prize: Anker Power Bank</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>Best Medical Hack</h2>
                    <p>The Best Medical Device Hack is an open-ended challenge aimed at improving or revolutionizing the medical and healthcare fields. Participants can design a new device or enhance an existing one to address real-world medical needs, from patient care to diagnostics. Creativity an impact on the healthcare industry are key.</p>
                  </div>
                  <p>Prize: JBL Flip 5</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex flex-col items-center gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-6 justify-between w-full h-full">
                  <div className="flex flex-col gap-2 justify-start">
                    <h2 className={`${swily.className} text-4xl`}>Best IoT Device Hack</h2>
                    <p>The Best IoT Device Hack challenges participants to innovate within the Internet of Things (IoT) space. Whether designing a new connected device or modifying an existing one, the goal is to enhance everyday experiences or solve pressing challenges through smarter interconnected systems. Projects can span industries from home automation to industrial monitoring, allowing great creativity and flexibility!</p>
                  </div>
                  <p>Prize: Portable Monitor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prizes;
