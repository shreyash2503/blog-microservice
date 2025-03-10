import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/home/navbar";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";


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
        <div className="relative h-screen min-h-screen w-full">
          <div className="relative mx-auto flex max-w-7xl flex-col">
            <Navbar />
              <AuthProvider>
                <ProtectedRoute>
                  <main>{children}</main>
                </ProtectedRoute>
              </AuthProvider>
          </div>
        </div>
  );
}
