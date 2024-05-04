"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await axios.post("/api/auth/password/forgot", { email });

    if (response.data.status == 200) {
      toast.success(response.data.message);
      router.push("/password/reset");
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <form
        className="flex flex-col items-center gap-4 border-2 border-border p-[1.8rem] rounded-lg"
        onSubmit={handleForgotPassword}
      >
        <h1 className="text-center text-[2rem]">Forgot Password?</h1>
        <span className="text-center w-[70%]">
          That&lsquo;s no fun. Enter your email and we&lsquo;ll send you
          instructions to reset your password.
        </span>
        <input
          type="email"
          value={email}
          className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Button type="submit">
          <span className="text-[1.2rem]">Email some help</span>
        </Button>
        <span className="text-center w-[70%]">
          Remember to check your spam folder if you can&lsquo;t find the
          message.
        </span>
      </form>
    </div>
  );
}
