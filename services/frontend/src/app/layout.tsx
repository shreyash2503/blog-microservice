import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono, Spinnaker } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import Navbar from "@/components/home/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Write everything that's on your mind!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-color-mode="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative h-screen min-h-screen w-full">
          <div className="relative mx-auto flex max-w-7xl flex-col">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <Navbar />
                {children}
              </AuthProvider>
              <Toaster />
            </ThemeProvider>
            {/* <div className="flex flex-wrap justify-center items-center gap-10 m-5" >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <BlogCard key={num} />
            ))}
          </div> */}
          </div>
        </div>
      </body>
    </html>
  );
}
