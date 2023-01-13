import { Container } from '@/components/styled/layout';

const About = () => {
    return <section className='flex items-center justify-center h-full'>
        <Container className='flex items-center justify-between'>
            <section className='flex flex-col lg:flex-row py-8 items-center text-center justify-center flex-1 gap-4 md:items-center lg:items-center md:py-8 lg:text-justify'>
                <div className='w-full lg:w-fit'>
                    <h1 className='title text-left'>About</h1>
                </div>
                <div className='flex-1 lg:ml-16 text-justify flex gap-2 flex-col items-start justify-start'>
                    <p className='text-lg lg:text-xl font-body'>
                        Gyan Fortress is a revolutionary platform that aims to solve the problem of high prices of scientific papers and technical books for low income countries. The platform was created with the goal of making knowledge more accessible and affordable to people around the world, regardless of their economic status.
                    </p>
                    <p className='text-lg lg:text-xl font-body'>
                        One of the major challenges faced by researchers and students in low income countries is the high cost of access to scientific papers and technical books. These materials are often priced at levels that are simply unaffordable for many people, making it difficult for them to advance in their fields of study or stay up-to-date with the latest research. Gyan Fortress aims to address this problem by offering a wide range of scientific papers and technical books at much lower prices than are typically found elsewhere.
                    </p>
                    <p className='text-lg lg:text-xl font-body'>
                        In addition to making knowledge more accessible and affordable, Gyan Fortress also aims to help authors earn a fair wage for their work. The platform uses a unique business model that allows authors to set their own prices for their papers and books, ensuring that they are fairly compensated for their contributions. This model not only helps to support the authors, but also encourages them to continue producing high-quality content that can be shared with a wider audience.
                    </p>
                    <p className='text-lg lg:text-xl font-body'>
                        Overall, Gyan Fortress is a valuable resource for anyone looking to access high-quality scientific papers and technical books at an affordable price. By making knowledge more accessible and supporting the authors who create it, Gyan Fortress is helping to create a more equitable and sustainable future for all.
                    </p>
                </div>
            </section>
        </Container>
    </section>;
};

export default About;