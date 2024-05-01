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

export default function Verify() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data } = await axios.post("/api/auth/verify", { otp });
    if (data.status == 200) {
      toast.success(data.message);
      router.push("/");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <form onSubmit={handleVerify}>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={otp}
        onChange={(value) => setOtp(value)}
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
      <Button type="submit">Verify</Button>
    </form>
  );
}
