'use client';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


const Navigation = ({ numberOfUsers }: { numberOfUsers: number; }) => {
    const pathname = usePathname();
    const activeLink = pathname;


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const openMobileNavigation = () => {
        setIsMobileMenuOpen(prev => !prev);
    };


    const mobileMenuContent = <nav className='absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full min-h-screen bg-light'>
        <span className='absolute text-5xl font-semibold top-4 right-8' onClick={openMobileNavigation}>&times;</span>
        <ul className='flex flex-col items-center justify-center h-full gap-8'>
            <li className='w-full text-center'><Link onClick={openMobileNavigation} href='/' className={`${activeLink === '/' ? "font-semibold" : ""} link`}>Home</Link></li>
            <li className='w-full text-center'><Link onClick={openMobileNavigation} href='/about' className={`${activeLink === '/about' ? "font-semibold" : ""} link`}>About</Link></li>
            <li className='w-full text-center'><Link onClick={openMobileNavigation} href='/pricing' className={`${activeLink === '/pricing' ? "font-semibold" : ""} link`}>Pricing</Link></li>
            <li className='w-full text-center'><Link onClick={openMobileNavigation} href='/contact' className={`${activeLink === '/contact' ? "font-semibold" : ""} link`}>Contact Me</Link></li>
            <li className='w-full text-center flex justify-center gap-4 items-center'>
                <Link href="/auth/login">
                    <button className='btn-small border-2 px-[1.4rem] py-[0.9rem] border-dark text-dark font-bold' onClick={openMobileNavigation}>
                        Sign In
                    </button>
                </Link>
                <Link href="/auth/signup">
                    <button className='btn-small gradient-highlight' onClick={openMobileNavigation}>
                        Sign Up
                    </button>
                </Link>
            </li>
        </ul>
    </nav>;

    if (isMobileMenuOpen) {
        return mobileMenuContent;
    }

    return (
        <>
            <nav className='hidden xl:flex'>
                <ul className='flex items-center justify-between gap-8'>
                    <li><Link href='/' className={`${activeLink === '/' ? "font-semibold" : ""} link`}>Home</Link></li>
                    <li><Link href='/about' className={`${activeLink === '/about' ? "font-semibold" : ""} link`}>About</Link></li>
                    <li><Link href='/pricing' className={`${activeLink === '/pricing' ? "font-semibold" : ""} link`}>Pricing</Link></li>
                    <li><Link href='/contact' className={`${activeLink === '/contact' ? "font-semibold" : ""} link`}>Contact Me</Link></li>
                </ul>
            </nav>
            <nav className='flex items-end gap-2 xl:hidden'>
                <Link href="/cart">
                    <li className='relative flex items-center gap-1 mr-6'>
                        <ShoppingBagIcon className="w-6 h-6 text-dark" />
                        <span className='absolute flex items-center justify-center w-6 h-6 text-xs rounded-full bg-highlight font-bold text-dark top-[-6px] right-[-12px]'>{0}</span>
                    </li>
                </Link>
                <div className='flex flex-col items-end flex-1 gap-1 xl:hidden' onClick={openMobileNavigation}>
                    <span className='flex w-8 h-1 bg-dark'></span>
                    <span className='flex w-8 h-1 bg-dark'></span>
                    <span className='flex w-8 h-1 bg-dark'></span>
                    <span className='flex w-8 h-1 bg-dark'></span>
                </div>
            </nav>

        </>
    );
};

export default Navigation;