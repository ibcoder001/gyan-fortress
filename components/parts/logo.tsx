"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="gradient-text uppercase flex items-center justify-end -m-4"
    >
      <Image
        src={"/site-logo.png"}
        width={64}
        height={64}
        alt={"Site Logo"}
        className="object-contain"
      />
      <span className="text-sm md:text-lg">GYAN FORTRESS</span>
    </Link>
  );
};
export default Logo;
