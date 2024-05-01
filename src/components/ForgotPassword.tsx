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
    <form onSubmit={handleForgotPassword}>
      <input
        type="email"
        value={email}
        className="bg-input p-2 rounded-md"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Button type="submit">Send Email</Button>
    </form>
  );
}
