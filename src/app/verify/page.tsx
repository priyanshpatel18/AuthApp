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
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-[2rem] rounded-md border-border border-2 items-center">
        <h2 className="text-[0.9rem] tracking-[0.5rem] uppercase text-center">
          OTP VERIFICATION
        </h2>
        <h1 className="text-[1.5rem] w-[70%] text-center">
          One Time Password (OTP) has been sent via mail to you email
        </h1>
        <span className="text-center">Enter the OTP below to verify it.</span>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
              <InputOTPSlot
                index={1}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
              <InputOTPSlot
                index={2}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
              <InputOTPSlot
                index={3}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
              <InputOTPSlot
                index={4}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
              <InputOTPSlot
                index={5}
                className="h-[4rem] w-[4rem] text-[2rem]"
              />
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit">
            <span className="text-[1.2rem]">Verify</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
