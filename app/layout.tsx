import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'BaseTip — Send Tips on Base',
  description: 'A simple and beautiful tipping app built on Base L2. Send ETH tips to anyone on Base chain.',
  openGraph: {
    title: 'BaseTip — Send Tips on Base',
    description: 'A simple and beautiful tipping app built on Base L2.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaseTip — Send Tips on Base',
    description: 'A simple and beautiful tipping app built on Base L2.',
  },
  other: {
    'base:app_id': '69a7e771f1a340127fafeb82',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
