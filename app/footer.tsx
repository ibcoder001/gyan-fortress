'use client';

import { Container } from '@/components/styled/layout';
import Link from 'next/link';
import { HiOutlineArrowUpCircle } from 'react-icons/hi2';

const Footer = () => {

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    };

    return <footer className='border-t border-dark/10'>
        <Container className='flex items-center justify-between py-3'>
            <Link href="/" className="text-sm md:text-xl gradient-text uppercase">Gyan Fortress</Link>
            <HiOutlineArrowUpCircle className='w-10 h-10 cursor-pointer text-dark' onClick={scrollToTop} />
        </Container>
        <section className="flex items-center justify-center text-center bg-dark text-light font-bold py-4 text-sm md:text-base">
            Copyright &copy; {new Date().getFullYear()} Saurabh Srivastava, IBCoder. All rights reserved.
        </section>
    </footer>;
};

export default Footer;