import localFont from "next/font/local";
import Image from "next/image";
import rainman from "../../public/rainman.png";

const swily = localFont({ src: '../pages/fonts/SwilyBright.otf' });

const Prizes = () => {

  return (
    <div className="flex flex-col w-full gap-32 py-32">
      <svg width="960" height="1359" viewBox="0 0 960 1359" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M949.5 -0.5C822.5 614.5 369.5 502.995 369.5 502.995C-26.5003 377.408 501.478 207.482 501.479 369.183C501.48 468.683 -219.5 894 86.4998 1349" stroke="white" stroke-opacity="0.55" stroke-width="20" stroke-linecap="round" />
      </svg>

      <div className="flex w-full justify-end">
        <div className="bg-[rgb(255,255,255,0.15)] border border-white p-4 grid grid-cols-4 gap-4 w-4/5 -skew-x-3 -skew-y-3 -rotate-3 -mr-16" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="col-span-4 bg-[#F5BFE4] p-8 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-6xl`}>1st Place Software</h2>
                <p>First place software track.</p>
              </div>
              <p>Prize: Electric Scooter</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-5xl`}>2nd Place Software</h2>
                <p>Second place software track.</p>
              </div>
              <p>Prize: Sony XM4 Headphones</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-5xl`}>3rd Place Software</h2>
                <p>Third place software track.</p>
              </div>
              <p>Prize: 165Hz Monitor</p>
            </div>
          </div>
          <div className="col-span-4">
            <div className="col-span-3 gap-4 grid grid-cols-3 font-poppins w-full">
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <div className="bg-[rgb(255,255,255,0.15)] border border-white p-4 grid grid-cols-4 gap-4 w-4/5 skew-x-3 skew-y-3 rotate-3 -ml-16" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="col-span-4 bg-[#F5BFE4] p-8 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-6xl`}>1st Place Hardware</h2>
                <p>First place software track.</p>
              </div>
              <p>Prize: Electric Scooter</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-5xl`}>2nd Place Software</h2>
                <p>Second place software track.</p>
              </div>
              <p>Prize: Sony XM4 Headphones</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#CCE9FF] p-4 flex gap-4 font-poppins">
            <Image src={rainman} alt="Rainman" className="max-w-32" />
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col">
                <h2 className={`${swily.className} text-5xl`}>3rd Place Software</h2>
                <p>Third place software track.</p>
              </div>
              <p>Prize: 165Hz Monitor</p>
            </div>
          </div>
          <div className="col-span-4">
            <div className="col-span-3 gap-4 grid grid-cols-3 font-poppins w-full">
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
                </div>
              </div>
              <div className="col-span-1 bg-white p-4 flex gap-4 font-poppins">
                <Image src={rainman} alt="Rainman" className="max-w-32" />
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col">
                    <h2 className={`${swily.className} text-4xl`}>3rd Place Software</h2>
                    <p>Third place software track.</p>
                  </div>
                  <p>Prize: 165Hz Monitor</p>
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
