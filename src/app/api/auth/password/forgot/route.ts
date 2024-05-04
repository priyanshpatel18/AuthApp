import { createOTP } from "@/actions/OTP";
import prisma from "@/db";
import sendOTP from "@/utils/nodemailer";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({
      status: 400,
      message: "Invalid Credentials",
    });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userExists) {
    return NextResponse.json({ status: 400, message: "User not found" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const { mailResponse } = await sendOTP(email, otp);

  if (mailResponse.accepted) {
    const { newOTP } = await createOTP({ otp, email });

    if (!newOTP) {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }

    cookies().set({
      name: "otpToken",
      value: newOTP.id.toString(),
    });

    return NextResponse.json({
      status: 200,
      message: `OTP sent to email ${email}`,
    });
  }
  return NextResponse.json({
    status: 500,
    message: "Internal Server Error",
  });
}
