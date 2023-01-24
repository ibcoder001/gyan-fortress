import Form from "@/components/parts/form";
import Pricings from "@/components/parts/pricings";
import Products from "@/components/products";
import { Container } from "@/components/styled/layout";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Footer from "./footer";
import Header from "./header";

const Page = async () => {
  const session = await unstable_getServerSession(authOptions);

  if (session) {
    return <Products />;
  }

  return (
    <div className="body">
      {/*// @ts-ignore*/}
      <Header />
      <main id="home" className="main">
        <section className="flex flex-col">
          <Container className="flex flex-col items-center justify-center flex-1 gap-4 px-4 overflow-auto text-center main-header-height md:items-center lg:items-center md:py-8 lg:w-full">
            <h1 className="font-bold title">
              Discover <span className="gradient-text">Affordable</span>{" "}
              Knowledge
            </h1>
            <h2 className="subtitle">
              Access high-quality knowledge to engineering, commerce, and
              scientific books and papers, at affordable prices &amp; support
              fair compensation for authors
            </h2>
            <Link href={"/auth/signup"}>
              <button className="mt-4 btn-large bg-dark text-light gradient-highlight">
                Join Club Now
              </button>
            </Link>
          </Container>
          <section
            id="about"
            className="flex items-start justify-center h-full min-h-full text-white lg:main-header-height gradient-black lg:items-center scroll-mt-24 lg:scroll-mt-12"
          >
            <Container className="flex flex-col items-center justify-between gap-8 md:px-4 lg:px-0">
              <h1 className="hidden w-full pt-12 mb-4 font-bold text-center lg:pt-0 title md:block">
                About
              </h1>
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
                <h2 className="flex-1 w-full h-full min-h-full px-6 py-12 text-5xl font-bold leading-normal text-center lg:rounded-md title md:py-20 lg:py-40 gradient-highlight">
                  Join for free or become a member to support
                </h2>
                <div className="flex flex-col flex-1 gap-4 px-4 py-12 text-lg text-center md:py-20 lg:text-justify md:text-2xl lg:py-0">
                  <p>
                    This project aims to solve the problem of high prices of
                    good technical books for students reciding in the developing
                    countries by providing them the same books in low prices.
                  </p>
                  <p>
                    The second aim of the project is to facilitate the idea of
                    investing in ones education rather than going for piracy as
                    things are that free are hardly valued.
                  </p>
                  <p>
                    As evident, this is more of a phillanthropist project that
                    depends on the authors of the books. Its success depends on
                    their willingness to participate in this project.
                  </p>
                  <p>
                    The project was started as a part of{" "}
                    <span>BuildSpace Night &amp; Weekends 2</span> session
                    during the weekends.
                  </p>
                </div>
              </div>
            </Container>
          </section>
          <section
            id="pricing"
            className="flex items-start justify-center h-full min-h-full pb-12 bg-white text-dark lg:main-header-height lg:items-center bg-hero-glamorous scroll-mt-24 lg:scroll-mt-12"
          >
            <Container className="flex flex-col items-center justify-between gap-8 md:px-4 lg:px-0">
              <h2 className="flex-1 w-full h-full min-h-full px-6 pt-12 font-bold text-center lg:rounded-md title gradient-text">
                Pricing
              </h2>
              <Pricings />
            </Container>
          </section>
          <section
            id="contact-me"
            className="h-full min-h-full text-white lg:main-header-height gradient-black scroll-mt-24 lg:scroll-mt-12"
          >
            <Container>
              <Form type="contact" />
            </Container>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
