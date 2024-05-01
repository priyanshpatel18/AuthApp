"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
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
    <form className="flex flex-col gap-5" onSubmit={handleRegister}>
      <input
        type="text"
        value={user.displayName}
        onChange={(e) => setUser({ ...user, displayName: e.target.value })}
        placeholder="Display Name"
        className="bg-input p-2 rounded-md"
        required
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="bg-input p-2 rounded-md"
        required
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="••••••••"
        className="bg-input p-2 rounded-md"
        required
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
