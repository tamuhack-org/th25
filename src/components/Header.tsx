import TrustBadge from './TrustBadge';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="flex justify-between pt-6">
            <Link href="https://tamuhack.org/">
                <Image
                    src={'/th_logo.png'}
                    alt="TAMUhack Logo"
                    width={32}
                    height={32}
                />
            </Link>
            <div className="flex items-start font-poppins">
                <Link
                    href="https://register.tamuhack.com/"
                    target="_blank"
                    className="hidden rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white lg:inline-block"
                >
                    Apply
                </Link>
                <Link
                    href="#"
                    className="ml-4 mr-8 hidden rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white lg:inline-block"
                >
                    Mentor
                </Link>
                <div className="-mt-6">
                    <TrustBadge />
                </div>
            </div>
        </header>
    );
};

export default Header;
