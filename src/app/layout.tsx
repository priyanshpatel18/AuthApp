import siteConfig from "@/config/siteConfig";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import { Appbar } from "@/components/Appbar";

export const metadata = siteConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Providers>
          <Appbar />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
