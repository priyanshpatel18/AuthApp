"use client";

import Logout from "@/components/Logout";
import { calSans } from "@/fonts/fonts";
import { ThemeToggler } from "./ThemeToggler";
import { useSession } from "next-auth/react";
import Login from "./LoginButton";

export const Appbar = () => {
  const session = useSession();

  return (
    <div className="h-[10vh] flex justify-between items-center p-[1rem] border-b-2 border-border">
      <span className={`${calSans} text-[1.2rem]`}>Auth App</span>
      <div className="flex gap-4 items-center">
        {session.data?.user ? <Logout /> : <Login />}
        <ThemeToggler />
      </div>
    </div>
  );
};
