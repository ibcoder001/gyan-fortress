import Form from '@/components/parts/form';
import { Container } from '@/components/styled/layout';

const Contact = () => {
    return (
        <section className='flex items-center justify-center h-full'>
            <Container className='flex items-center justify-between w-full py-8'>
                <Form type="contact" />
            </Container>
        </section>
    );
};

export default Contact;