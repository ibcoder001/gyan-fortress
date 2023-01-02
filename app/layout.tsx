import './globals.css';
import Header from './header';
import Footer from './footer';
import { AnalyticsWrapper } from '@/components/analytics/analytics';
import { ToasterWrapper } from '@/components/parts/toaster';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
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
      </body>
    </html>
  );
}
