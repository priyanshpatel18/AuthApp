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
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-[2rem] border-border border-2 rounded-md flex flex-col gap-4">
        <h1 className="text-[0.9rem] tracking-[0.5rem] uppercase text-center">
          Reset Password
        </h1>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={data.otp}
            onChange={(value) => setData({ ...data, otp: value })}
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
          <input
            type="password"
            value={data.password}
            className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={data.confirmPassword}
            className="bg-input p-[0.7rem] rounded-lg text-[1.3rem]"
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            placeholder="Password"
            required
          />
          <Button type="submit">
            <span className="text-[1.2rem]">Verify and Reset</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
