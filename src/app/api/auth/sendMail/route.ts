import { createOTP } from "@/actions/OTP";
import prisma from "@/db";
import { generateJWT } from "@/lib/auth";
import sendOTP from "@/utils/nodemailer";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { z } from "zod";

export const RegisterUserSchema = z.object({
  displayName: z.string(),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
});

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validateData = RegisterUserSchema.parse(requestBody);
  if (
    validateData.email !== requestBody.email ||
    validateData.password !== requestBody.password ||
    validateData.displayName !== requestBody.displayName
  ) {
    return NextResponse.json({
      status: 400,
      message: "Invalid Credentials",
    });
  }
  const { displayName, email, password } = validateData;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    return NextResponse.json({
      status: 400,
      message: "User Already Exists",
    });
  }

  const userToken = generateJWT({
    displayName,
    email,
    password,
  });

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const { mailResponse } = await sendOTP(email, otp);

  if (mailResponse.accepted) {
    const { newOTP } = await createOTP({ otp, userToken, email });

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
