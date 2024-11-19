import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';

export default function Home() {
    return (
        <div className="bg-sky-blue max-w-screen-2xl px-8">
            <Header />
            <main className="mt-24 min-h-screen">
                <div className="grid grid-rows-2 gap-24 font-serif md:grid-cols-2">
                    <div className="flex flex-grow flex-col items-end justify-around text-white">
                        <div className="flex flex-col items-start">
                            <h1 className="text-8xl">TAMUHACK</h1>
                            <h2 className="text-2xl">
                                January 23-24, 2025 @ MSC 2500
                            </h2>
                        </div>
                        <div className="text-right text-3xl">
                            <p>00:01:31:04</p>
                            <p>until hacking begins</p>
                        </div>
                    </div>
                    <svg
                        className="image-clip"
                        width="600px"
                        height="600px"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <clipPath id="shape11">
                                <path
                                    className="path-anim"
                                    d="M494.246 145.646c25 39 10.2 103.8-1.2 157.2-11.4 53.4-19.5 95.3-44.5 129.3-25 34-66.9 60.1-120.6 71.7-53.6 11.7-118.9 9-163.7-25-44.8-34-69.2-99.3-71.9-167.3-2.7-68 16.2-138.7 61-177.7 44.9-39 115.6-46.3 183.4-43.4 67.7 3 132.5 16.2 157.5 55.2"
                                    data-path-to="M422.248 192.542c44.2 49.2 94.8 86.9 111.3 141.1 16.5 54.2-1.1 124.9-45.3 161.8-44.2 36.8-114.9 39.7-167.9 22.1-53.1-17.7-88.4-56-137.1-92.9-48.6-36.8-110.6-72.1-121.2-118.1-10.6-46 30.1-102.5 78.8-151.7 48.7-49.2 105.2-90.9 152.4-81.5 47.1 9.4 84.8 70 129 119.2"
                                    vector-effect="non-scaling-stroke"
                                ></path>
                            </clipPath>
                        </defs>
                        <image
                            clip-path="url(#shape11)"
                            href="https://placehold.co/400"
                            x="0"
                            y="0"
                            width="600"
                            height="600"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </svg>
                </div>
            </main>
            <TamuhackFooter />
        </div>
    );
}
