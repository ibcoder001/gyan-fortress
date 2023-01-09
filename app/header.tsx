import Navigation from '@/components/parts/navigation';
import UserInfoCard from '@/components/parts/userinfocard';
import { Container } from '@/components/styled/layout';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = async () => {
    const session = await unstable_getServerSession(authOptions);
    return (
        <header className='py-4'>
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
                                <HiOutlineShoppingBag className="w-6 h-6 text-dark" />
                                <span className='absolute flex items-center justify-center w-6 h-6 text-xs rounded-full bg-highlight text-dark font-bold top-[-6px] right-[-12px]'>{0}</span>
                            </li>
                        </Link>
                        {!session ? (
                            <>
                                <li>
                                    <button className='btn-small border-2 px-[1.4rem] py-[0.9rem] font-bold bg-light'>
                                        <Link href="/auth/login">Sign In</Link>
                                    </button>
                                </li>
                                <li>
                                    <button className='btn-small gradient-highlight'>
                                        <Link href="/auth/signup">Sign Up</Link>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <UserInfoCard />
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );

};

export default Header;