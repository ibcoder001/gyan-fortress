import { Container } from '@/components/styled/layout';
import Link from 'next/link';

const Page = async () => {
    return <section className='flex items-center justify-center h-full md:items-start lg:items-center'>
        <Container className='flex flex-col items-center justify-between'>
            <section className='flex flex-col items-center text-center justify-center flex-1 gap-4 md:items-center lg:items-center md:py-8 lg:w-[50rem]'>
                <h1 className='title'>Discover <span className='gradient-text'>Affordable</span> Knowledge</h1>
                <h2 className='subtitle'>Access high-quality knowledge to engineering, commerce, and scientific books and papers, at affordable prices &amp; support fair compensation for authors</h2>
                <Link href="/auth/signup">
                    <button className='btn-large mt-4 bg-dark text-light gradient-highlight'>Join Club Now</button>
                </Link>
            </section>
        </Container>
    </section>;
};

export default Page;