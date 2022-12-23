import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

import { SmallButton } from '@/components/styled/button';
import { Container } from '@/components/styled/layout';
import { Logo } from '@/components/styled/typography';
import Navigation from '@/components/parts/navigation';
import { getUsers } from '@lib/prisma/user';

const Header = async () => {
    const { users } = await getUsers();
    const numberOfUsers = Number(users?.length);
    return (
        <header className='py-4 bg-light'>
            <Container className='flex items-center justify-between'>
                <section className='flex items-center justify-between flex-1 gap-20 xl:justify-start'>
                    <Logo>Gyan Fortress</Logo>
                    <Navigation numberOfUsers={numberOfUsers} />
                </section>
                <nav className='hidden xl:block xl:flex-1'>
                    <ul className='flex items-center justify-end gap-3'>
                        <Link href="/cart">
                            <li className='relative flex items-center gap-1 mr-6'>
                                <span className='text-xl'>Cart</span>
                                <ShoppingBagIcon className="w-6 h-6 text-dark" />
                                <span className='absolute flex items-center justify-center w-6 h-6 text-xs rounded-full bg-dark text-light top-[-6px] right-[-12px]'>{numberOfUsers}</span>
                            </li>
                        </Link>
                        <li>
                            <SmallButton className='bg-dark text-light'>
                                <Link href="/">Sign Up</Link>
                            </SmallButton>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );

};

export default Header;