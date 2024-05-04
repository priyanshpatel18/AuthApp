"use client";

import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await axios.post("/api/auth/sendMail", user);

    if (response.data.status == 200) {
      toast.success(response.data.message);
      router.push("/verify");
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-[2rem] rounded-md border-border border-2 items-center">
        <h2 className="text-[0.9rem] tracking-[0.5rem] uppercase">register</h2>
        <h1 className="text-[2rem]">Create Your Account</h1>
        <div className="flex gap-8 items-center">
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <input
              type="text"
              value={user.displayName}
              onChange={(e) =>
                setUser({ ...user, displayName: e.target.value })
              }
              placeholder="Display Name"
              className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
              required
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
              required
            />
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
              required
            />
            <Button type="submit">
              <span className="text-[1.2rem]">Register</span>
            </Button>
          </form>
          <Socials />
        </div>
        <h2>
          Already have an account?{" "}
          <Link href="/login" className="text-[1.1rem] underline text-center">
            Login Now
          </Link>
        </h2>
      </div>
    </div>
  );
}
