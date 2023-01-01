import Form from '@/components/parts/form';
import { Container } from '@/components/styled/layout';

const Contact = () => {
    return (
        <section id="about" className='flex items-center justify-center h-full'>
            <Container className='flex items-center justify-between w-full md:w-3/4 lg:w-full'>
                <section className='flex flex-col lg:flex-row py-8 items-center text-center justify-center flex-1 gap-4 md:items-center lg:items-center md:py-8 bg-light lg:text-justify'>
                    <div className='flex-1 w-full'>
                        <h1 className='title text-left'>Contact Me</h1>
                    </div>
                    <Form type="contact" />
                </section>
            </Container>
        </section>
    );
};

export default Contact;