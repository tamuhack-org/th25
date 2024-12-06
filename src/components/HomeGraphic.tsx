import Image from 'next/image';
import HomeImage from '@/../public/home_image.png';
import Guy from '@/../public/guy.png';

export default function HomeGraphic() {
    return (
        <div className="relative">
            <Image
                src={HomeImage}
                alt="Reflection of College Station in a puddle"
                width={800}
                height={600}
                placeholder="empty"
                className="mx-auto lg:mx-0"
            />
            <Image
                src={Guy}
                alt="Just a guy walking"
                width={64}
                height={64}
                placeholder="empty"
                className="absolute bottom-0 right-[25%] max-w-9 md:max-w-12 lg:max-w-16"
            />
        </div>
    );
}
