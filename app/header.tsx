import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

import { Container } from '@/components/styled/layout';
import Navigation from '@/components/parts/navigation';

const Header = async () => {
    return (
        <header className='py-4 bg-light'>
            <Container className='flex items-center justify-between'>
                <section className='flex items-center justify-between flex-1 gap-20 xl:justify-start'>
                    <Link href="/" className="text-xl gradient-text uppercase">Gyan Fortress</Link>
                    <Navigation numberOfUsers={0} />
                </section>
                <nav className='hidden xl:block xl:flex-1'>
                    <ul className='flex items-center justify-end gap-3'>
                        <Link href="/cart">
                            <li className='relative flex items-center gap-1 mr-6'>
                                <span className='text-md uppercase font-bold'>Cart</span>
                                <ShoppingBagIcon className="w-6 h-6 text-dark" />
                                <span className='absolute flex items-center justify-center w-6 h-6 text-xs rounded-full bg-highlight text-dark font-bold top-[-6px] right-[-12px]'>{0}</span>
                            </li>
                        </Link>
                        <li>
                            <button className='btn-small border-2 px-[1.4rem] py-[0.9rem] border-dark text-dark font-bold'>
                                <Link href="/auth/login">Sign In</Link>
                            </button>
                        </li>
                        <li>
                            <button className='btn-small gradient-highlight'>
                                <Link href="/auth/signup">Sign Up</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );

};

export default Header;