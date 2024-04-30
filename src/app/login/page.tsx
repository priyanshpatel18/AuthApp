"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Login() {
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
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <input
        type="email"
        value={user.email}
        className="bg-input p-2 rounded-md"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={user.password}
        className="bg-input p-2 rounded-md"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        required
      />
      <Button type="submit">Login</Button>

      <Button
        variant="outline"
        onClick={() => {
          signIn("github");
        }}
      >
        Login with Github
      </Button>
    </form>
  );
}
