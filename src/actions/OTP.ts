import prisma from "@/db";

type IProps = {
  otp: string;
  userToken?: string;
  email: string;
};

export async function createOTP({ otp, userToken, email }: IProps) {
  const expiresAt = new Date(new Date().getTime() + 10 * 60 * 1000);

  const newOTP = await prisma.otp.upsert({
    where: {
      email,
    },
    create: {
      otp,
      userToken,
      email,
      expiresAt,
      verified: false,
    },
    update: {
      otp,
      expiresAt,
      userToken: userToken || "",
      verified: false,
    },
  });

  return { newOTP };
}
