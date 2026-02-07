import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import SessionProvider from "@/components/SessionProvider";
import { auth } from "@/auth"; // ✅ Import auth

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ayurvedic Store",
  description: "Premium Ayurvedic products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Fetch session on the server
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ Pass the session to the provider */}
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}