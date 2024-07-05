// next
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// styles
import "./globals.css";

// components
import Nav from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "o-imports - The ultimate imports organiser",
  description: "Organise your messy imports section using the OG o-imports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen ${inter.className}`}>
        <Nav />
        <main className="flex-grow overflow-y-auto p-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
