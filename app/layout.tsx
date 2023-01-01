import './globals.css';
import Header from './header';
import Footer from './footer';
import { AnalyticsWrapper } from '@/components/analytics/analytics';
import { ToasterWrapper } from '@/components/parts/toaster';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import AuthWrapper from '@/components/auth/hooks';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head />
        <body className='text-dark font-body bg-light'>
          {/* @ts-expect-error Server Component */}
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <ToasterWrapper />
          <AnalyticsWrapper />
          <AuthWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
