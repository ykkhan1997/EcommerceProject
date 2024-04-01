"use client";
import React from "react";
import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut, signIn, useSession } from "next-auth/react";

const Menu = () => {
  const { items,init } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };
  const { data: session } = useSession();
  return (
    <>
      <div>
        <ul className="flex items-stretch">
          <li>
            <Link href="/cart" className="btn btn-ghost rounded-btn">
              Cart
              {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{" "}
                </div>
              )}
            </Link>
          </li>
          {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    {session.user.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </label>
                  <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                    <li>
                      <Link href={"/order-history"}>Order history</Link>
                    </li>
                    <li>
                      <Link href={"/profile"}>Profile</Link>
                    </li>
                    <li>
                      <button type="button" onClick={signOutHandler}>SignOut</button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button className="btn btn-ghost rounded-btn" type="button" onClick={()=>signIn()}>Sign In</button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
