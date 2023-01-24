"use client";
import UserInfoCard from "@/components/parts/userinfocard";
import { Session } from "next-auth";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { HiBars4, HiOutlineShoppingBag } from "react-icons/hi2";

const links = [
  { name: "Home", href: "#home", section: "home" },
  { name: "About", href: "#about", section: "about" },
  { name: "Pricing", href: "#pricing", section: "pricing" },
  { name: "Contact Me", href: "#contact-me", section: "contact-me" },
];

const MenuNavigation = ({
  numberOfItems,
  session,
}: {
  numberOfItems: number;
  session: Session | null;
}) => {
  const [activeLink, setActiveLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleMenuNavigation = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.hash);
    }
  }, [activeLink]);
  return (
    <nav className="flex items-center justify-end lg:items-start lg:justify-start">
      <Link href={"/cart"} className="lg:hidden">
        <li className="relative flex items-center gap-1 mr-6">
          <span className="font-bold uppercase text-md">Cart</span>
          <HiOutlineShoppingBag className="w-6 h-6 text-dark" />
          <span className="absolute flex items-center justify-center w-6 h-6 text-xs rounded-full gradient-highlight text-light font-bold top-[-6px] right-[-12px]">
            {numberOfItems}
          </span>
        </li>
      </Link>
      <HiBars4
        className="w-10 h-10 font-semibold cursor-pointer lg:hidden text-dark"
        onClick={handleMenuNavigation}
      />
      <ul
        className={`fixed grid place-content-center gap-2 lg:gap-0 text-center lg:text-left lg:relative lg:flex lg:min-h-0 lg:space-y-0 lg:space-x-6 lg:p-0 lg:translate-y-0 lg:top-0 right-0 left-0 min-h-screen space-y-4 top-16 bg-light py-8 px-4 transform ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        } transition duration-300`}
      >
        {links.map(
          ({
            name,
            href,
            section,
          }: {
            name: string;
            href: string;
            section: string;
          }) => {
            console.log({ section, href, activeLink });
            return (
              <li key={name} className="min-w-fit">
                <a
                  onClick={() => {
                    setActiveLink(href);
                    handleMenuNavigation();
                  }}
                  href={href}
                  className={`${
                    section !== "home" && activeLink === `#${section}`
                      ? "text-dark"
                      : section === "home" && activeLink === ""
                      ? "text-dark"
                      : ""
                  } link`}
                >
                  {name}
                </a>
              </li>
            );
          }
        )}
        {!session ? (
          <Fragment>
            <li className="lg:hidden">
              <button
                className="btn-medium max-w-full w-full border-2 px-[1.4rem] py-[1.25rem] font-bold bg-light"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <Link href={"/auth/login"}>Sign In</Link>
              </button>
            </li>
            <li className="lg:hidden">
              <button
                className="w-full max-w-full btn-medium gradient-highlight"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <Link href={"/auth/signup"}>Sign Up</Link>
              </button>
            </li>
          </Fragment>
        ) : (
          <UserInfoCard classes={"lg:hidden"} />
        )}
      </ul>
    </nav>
  );
};

export default MenuNavigation;
