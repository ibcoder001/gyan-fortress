import Form from '@/components/parts/form';
import { LargeButton } from '@/components/styled/button';
import { Container } from '@/components/styled/layout';
import { Title } from '@/components/styled/typography';

const Page = () => {
    return <section className='flex items-center justify-center h-full bg-light'>
        <Container className='flex flex-col items-center justify-between xl:flex-row'>
            <section className='relative items-center justify-center flex-1 hidden pr-16 xl:flex'>
                <div className='w-96 h-96 border-t-dark border-l-dark border-t-[1.5rem] border-l-[1.5rem] absolute top-[-5rem] left-0'></div>
                <div className='flex flex-col gap-16 px-16 py-0'>
                    <Title>Join The Literary Revolution</Title>
                    <LargeButton className='bg-dark text-light'>Start Browsing</LargeButton>
                </div>
                <div className='w-96 h-96 border-b-dark border-r-dark border-r-[1.5rem] border-b-[1.5rem] absolute bottom-[-5rem] right-[4rem]'></div>
            </section>
            <section className='relative items-center justify-center flex-1 pr-16 xl:hidden'>
                <div className='flex flex-col gap-16 px-16 py-0'>
                    <Title>Join The Literary Revolution</Title>
                    <LargeButton className='bg-dark text-light'>Start Browsing</LargeButton>
                </div>
            </section>
            <Form type="signup" />
        </Container>
    </section>;
};

export default Page;