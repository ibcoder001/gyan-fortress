"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlineChevronDown } from "react-icons/hi2";

const UserInfoCard = ({ classes }: { classes: string }) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      <li
        className={`flex items-center justify-start gap-2 sm:ml-4 cursor-pointer focus-within:opacity-50 bg-dark text-light p-2 rounded-sm ${classes}`}
        onClick={() => signOut()}
      >
        <Image
          src={user?.image || "/site-logo.png"}
          width={64}
          height={64}
          alt={user?.name || "No profile image"}
          className="w-10 h-10 rounded-full"
        />
        {/* <span className="text-sm uppercase font-semibold">{user?.name || ""}</span> */}
        <span className="text-sm uppercase font-semibold mr-3">Logout</span>
        {/* <HiOutlineChevronDown className="w-6 h-6" /> */}
      </li>
    </>
  );
};

export default UserInfoCard;
