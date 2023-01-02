import Form from '@/components/parts/form';

type TAuthParams = {
    params: { slug: ["signup"] | ["login"]; };
};

const Page = ({ params }: TAuthParams) => {
    const { slug } = params;
    return <Form type={slug[0]} />;
};

export async function generateStaticParams() {
    return [
        { slug: ['login'] },
        { slug: ['signup'] }
    ];
}

export default Page;