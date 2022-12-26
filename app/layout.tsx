import './globals.css';
import Header from './header';
import Footer from './footer';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang='en'>
      <head />
      <body className='text-dark'>
        {/* @ts-expect-error Server Component */}
        <Header />
        <main className='relative'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
