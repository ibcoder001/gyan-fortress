'use client';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SmallButton } from '../styled/button';

import { Menu, MobileMenu } from '../styled/typography';

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
            <li className='w-32'><MobileMenu props={{ onClick: openMobileNavigation }} url='/' className={`${activeLink === '/' ? "font-semibold" : ""} hover:font-semibold`}>Home</MobileMenu></li>
            <li className='w-32'><MobileMenu props={{ onClick: openMobileNavigation }} url='/about' className={`${activeLink === '/about' ? "font-semibold" : ""} hover:font-semibold`}>About</MobileMenu></li>
            <li className='w-32'><MobileMenu props={{ onClick: openMobileNavigation }} url='/pricing' className={`${activeLink === '/pricing' ? "font-semibold" : ""} hover:font-semibold`}>Pricing</MobileMenu></li>
            <li className='w-32'><MobileMenu props={{ onClick: openMobileNavigation }} url='/contact' className={`${activeLink === '/contact' ? "font-semibold" : ""} hover:font-semibold`}>Contact Me</MobileMenu></li>
            <li className='w-32 mt-8'>
                <SmallButton className='bg-dark text-light'>
                    <Link href="/">Sign Up</Link>
                </SmallButton>
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
                    <li><Menu url='/' className={`${activeLink === '/' ? "font-semibold" : ""} hover:font-semibold`}>Home</Menu></li>
                    <li><Menu url='/about' className={`${activeLink === '/about' ? "font-semibold" : ""} hover:font-semibold`}>About</Menu></li>
                    <li><Menu url='/pricing' className={`${activeLink === '/pricing' ? "font-semibold" : ""} hover:font-semibold`}>Pricing</Menu></li>
                    <li><Menu url='/contact' className={`${activeLink === '/contact' ? "font-semibold" : ""} hover:font-semibold`}>Contact Me</Menu></li>
                </ul>
            </nav>
            <nav className='flex items-end gap-2 xl:hidden'>
                <Link href="/cart">
                    <li className='relative flex items-center gap-1 mr-6'>
                        <ShoppingBagIcon className="w-6 h-6 text-dark" />
                        <span className='absolute flex items-center justify-center w-6 h-6 text-xs rounded-full bg-dark text-light top-[-6px] right-[-12px]'>{0}</span>
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