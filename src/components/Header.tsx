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
            <div className="flex items-start">
                <Link
                    href="#"
                    className="hidden lg:inline-block rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                >
                    Apply
                </Link>
                <Link
                    href="#"
                    className="hidden lg:inline-block ml-4 mr-8 rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
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
