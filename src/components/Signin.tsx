"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

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
      <div className="flex gap-4 p-[2rem] border-border border-2 items-center">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={user.email}
            className="bg-input p-2 rounded-md"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            value={user.password}
            className="bg-input p-2 rounded-md"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <Link href="/password/forgot" className="text-sm underline">
            Forgot Password?
          </Link>
          <Button type="submit">Login</Button>
        </form>
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={async () => {
              await signIn("github");
            }}
          >
            Login with Github
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              await signIn("google");
            }}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
