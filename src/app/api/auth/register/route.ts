import prisma from "@/db";
import { generateJWT } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  

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



  return NextResponse.json({
    message: "Account Created Successfully",
    status: 200,
  });
}
