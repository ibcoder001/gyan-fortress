import Form from '@/components/parts/form';
import { Container } from '@/components/styled/layout';

type TAuthParams = {
    params: { slug: ["signup"] | ["login"]; };
};

const Page = async ({ params }: TAuthParams) => {
    const { slug } = params;
    return <section className='flex items-center justify-center h-full'>
        <Container className='flex items-center justify-between w-full'>
            <Form type={slug[0]} />
        </Container>
    </section>;
};

export async function generateStaticParams() {
    return [
        { slug: ['login'] },
        { slug: ['signup'] }
    ];
}

export default Page;