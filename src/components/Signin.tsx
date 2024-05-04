"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Socials from "./Socials";

export default function Signin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      callbackUrl: "/",
      redirect: false,
    });
    if (response?.status === 200) {
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      toast.error("Error Signing in");
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-[2rem] rounded-md border-border border-2 items-center">
        <h2 className="text-[0.9rem] tracking-[0.5rem] uppercase">
          welcome back
        </h2>
        <h1 className="text-[2rem]">Sign In to Your Account</h1>
        <div className="flex gap-8 items-center">
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={user.email}
              className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
              autoComplete="email"
            />
            <input
              type="password"
              value={user.password}
              className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <Link
              href="/password/forgot"
              className="text-[1.1rem] underline text-center"
            >
              Forgot Password?
            </Link>
            <Button type="submit">
              <span className="text-[1.2rem]">Login</span>
            </Button>
          </form>
          <Socials />
        </div>
        <h2>
          Don&lsquo;t have an account?{" "}
          <Link
            href="/register"
            className="text-[1.1rem] underline text-center"
          >
            Register Now
          </Link>
        </h2>
      </div>
    </div>
  );
}
