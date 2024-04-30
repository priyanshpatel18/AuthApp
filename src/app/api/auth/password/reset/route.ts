import prisma from "@/db";
import { genSalt, hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { otp, password } = requestBody;
  if (
    !otp ||
    !password ||
    typeof otp !== "string" ||
    typeof password !== "string"
  ) {
    return NextResponse.json({ status: 400, message: "Invalid OTP" });
  }

  const otpToken = cookies().get("otpToken")?.value || "";
  if (!otpToken) {
    return NextResponse.json({ status: 400, message: "Invalid OTP" });
  }

  const otpDoc = await prisma.otp.findFirst({
    where: {
      id: Number(otpToken),
    },
  });
  if (!otpDoc) {
    return NextResponse.json({ status: 400, message: "Invalid OTP" });
  }
  if (otpDoc.expiresAt < new Date()) {
    return NextResponse.json({ status: 400, message: "OTP Expired" });
  }
  if (otpDoc.otp !== otp) {
    return NextResponse.json({ status: 400, message: "Incorrect OTP" });
  }

  const userExists = await prisma.user.update({
    where: {
      email: otpDoc?.email,
    },
    data: {
      password: await hash(password, await genSalt(10)),
    },
  });
  if (!userExists) {
    return NextResponse.json({ status: 400, message: "User not found" });
  }

  return NextResponse.json({
    status: 200,
    message: "Password Changed",
  });
}
