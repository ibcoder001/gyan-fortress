"use client";

import UserInfoCard from "@/components/parts/userinfocard";
import { Session } from "next-auth";
import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const UserNavigation = ({
  numberOfItems,
  session,
}: {
  numberOfItems: number;
  session: Session | null;
}) => {
  return (
    <nav className="hidden lg:block lg:flex-1">
      <ul className="flex items-center justify-end gap-3">
        <Link href={"/cart"}>
          <li className="relative flex items-center gap-1 mr-6">
            <span className="text-md uppercase font-bold">Cart</span>
            <HiOutlineShoppingBag className="w-6 h-6 text-dark" />
            <span className="absolute flex items-center justify-center w-6 h-6 text-xs rounded-full gradient-highlight text-light font-bold top-[-6px] right-[-12px]">
              {numberOfItems}
            </span>
          </li>
        </Link>
        {!session ? (
          <Fragment>
            <li>
              <button className="btn-small border-2 px-[1.4rem] py-[0.9rem] font-bold bg-light">
                <Link href={"/auth/login"}>Sign In</Link>
              </button>
            </li>
            <li>
              <button className="btn-small gradient-highlight">
                <Link href={"/auth/signup"}>Sign Up</Link>
              </button>
            </li>
          </Fragment>
        ) : (
          <UserInfoCard classes={""} />
        )}
      </ul>
    </nav>
  );
};

export default UserNavigation;
