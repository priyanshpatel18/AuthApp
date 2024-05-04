import localFont from "next/font/local";

const calSansFont = localFont({
  src: "./CalSans-SemiBold.woff2",
});
export const calSans = calSansFont.className;

const poppinsFont = localFont({
  src: "./Poppins.ttf",
});
export const poppins = poppinsFont.className;
