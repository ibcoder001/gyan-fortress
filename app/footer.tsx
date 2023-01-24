"use client";

import Logo from "@/components/parts/logo";
import { Container } from "@/components/styled/layout";
import { HiOutlineArrowUpCircle } from "react-icons/hi2";

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="px-4 bg-dark">
      <Container className="flex items-center justify-between pt-8">
        <Logo />
        <HiOutlineArrowUpCircle
          className="w-10 h-10 cursor-pointer text-light/30"
          onClick={scrollToTop}
        />
      </Container>
      <section className="flex items-center justify-center pb-8 mt-4 text-sm font-bold text-center bg-dark text-light md:text-base">
        Copyright &copy; {new Date().getFullYear()} Saurabh Srivastava, IBCoder.
        All rights reserved.
      </section>
    </footer>
  );
};

export default Footer;
