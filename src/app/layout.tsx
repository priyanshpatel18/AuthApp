import { Providers } from "@/Providers/Providers";
import { Appbar } from "@/components/Appbar";
import Toaster from "@/components/ui/sonner";
import siteConfig from "@/config/siteConfig";
import { poppins } from "@/fonts/fonts";
import "./globals.css";

export const metadata = siteConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background ${poppins}`}>
        <Providers>
          <Appbar />
          <div>{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
