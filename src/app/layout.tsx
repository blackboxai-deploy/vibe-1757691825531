import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QEMU Setup Wizard for Windows",
  description: "Configure and generate scripts for QEMU on Windows 10/11 without WSL2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <header className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">QEMU Setup Wizard</h1>
        </header>
        <main className="container mx-auto py-8">
          {children}
        </main>
        <footer className="bg-gray-200 py-4 px-6 text-center text-sm">
          © 2023 QEMU Wizard. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
