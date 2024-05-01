"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const router = useRouter();

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await axios.post("/api/auth/password/reset", data);
    if (response.data.status == 200) {
      toast.success(response.data.message);
      router.push("/login");
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <form onSubmit={handleResetPassword}>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={data.otp}
        onChange={(value) => setData({ ...data, otp: value })}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <input
        type="password"
        value={data.password}
        className="bg-input p-2 rounded-md"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={data.confirmPassword}
        className="bg-input p-2 rounded-md"
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        placeholder="Password"
        required
      />
      <Button type="submit">Verify and Reset</Button>
    </form>
  );
}
