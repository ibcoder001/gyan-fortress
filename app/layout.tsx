import '../styles/globals.css';
import { Expletus_Sans, Questrial, IBM_Plex_Mono } from '@next/font/google';

const questrial = Questrial({ weight: ['400'], variable: '--font-questrial' });
const expletus = Expletus_Sans({ variable: '--font-expletus' });
const ibm = IBM_Plex_Mono({ weight: ['400', '600'], variable: '--font-ibm' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${questrial.variable} ${expletus.variable} ${ibm.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}
