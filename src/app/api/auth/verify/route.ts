import prisma from "@/db";
import { verifyJWT } from "@/lib/auth";
import { genSalt, hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { otp } = requestBody;
  if (!otp || typeof otp !== "string") {
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

  const userObject = verifyJWT(otpDoc.userToken?.toString() || "");
  if (!userObject || typeof userObject !== "object") {
    return NextResponse.json({ status: 400, message: "Invalid OTP" });
  }

  const newUser = await prisma.user.create({
    data: {
      email: userObject.payload.email,
      displayName: userObject.payload.displayName,
      password: await hash(userObject.payload.password, await genSalt(10)),
    },
  });
  if (!newUser) {
    return NextResponse.json({
      status: 400,
      message: "Failed to create account",
    });
  }
  cookies().delete("otpToken");

  return NextResponse.json({
    status: 200,
    message: "Account Created Successfully",
  });
}
