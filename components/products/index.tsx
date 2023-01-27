import ProductCard from "@/components/products/product-card";
import Footer from "app/footer";
import Header from "app/header";
import { Container } from "@/components/styled/layout";

const Products = () => {
  return (
    <div className="body">
      {/*// @ts-ignore*/}
      <Header />
      <main id="home" className="main">
        <section className="flex flex-col">
          <Container className="flex flex-col items-center justify-center flex-1 gap-4 px-4 overflow-auto text-center main-header-height md:items-center lg:items-center md:py-8 lg:w-full">
            <h1 className="title font-bold gradient-text">
              Thanks for signing up! We will send you product updates regularly
            </h1>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
