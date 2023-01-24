import { AnalyticsWrapper } from "@/components/analytics/analytics";
import AuthContext from "@/components/parts/auth-session";
import { ToasterWrapper } from "@/components/parts/toaster";
import { Inter } from "@next/font/google";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await unstable_getServerSession(authOptions);
  return (
    <body className={`text-dark ${inter.className}`}>
      <AuthContext session={session}>
        {children}
        <ToasterWrapper />
        <AnalyticsWrapper />
      </AuthContext>
    </body>
  );
}
