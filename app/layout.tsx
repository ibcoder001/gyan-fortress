import { AnalyticsWrapper } from '@/components/analytics/analytics';
import AuthContext from '@/components/parts/auth-session';
import { ToasterWrapper } from '@/components/parts/toaster';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React from "react";
import Footer from './footer';
import './globals.css';
import Header from './header';

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const session = await unstable_getServerSession(authOptions);
  return (
    <html lang='en'>
      <head />
      <body className='text-dark font-body bg-light/70'>
        <AuthContext session={session}>
          {/* @ts-expect-error Server Component */}
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <ToasterWrapper />
          <AnalyticsWrapper />
        </AuthContext>
      </body>
    </html>
  );
}
