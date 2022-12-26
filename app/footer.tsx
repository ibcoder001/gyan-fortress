'use client';

import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

import { Container } from '@/components/styled/layout';
import { Logo } from '@/components/styled/typography';

const Footer = () => {

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    };

    return <footer className='py-4 bg-shadow'>
        <Container className='flex items-center justify-between'>
            <Logo>Gyan Fortress</Logo>
            <section className="text-base">
                Copyright &copy; 2022 Saurabh Srivastava, IBCoder. All rights reserved.
            </section>
            <ArrowUpCircleIcon className='w-10 h-10 cursor-pointer text-dark' onClick={scrollToTop} />
        </Container>
    </footer>;
};

export default Footer;