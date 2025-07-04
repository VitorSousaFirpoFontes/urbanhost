import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | UrbanHost',
    default: 'UrbanHost - Encontre estadias exclusivas',
  },
  description:
    'Descubra hospedagens incríveis com a UrbanHost, uma plataforma moderna para encontrar e anunciar acomodações únicas.',
  keywords: ['urbanhost', 'hospedagem', 'viagem', 'aluguel por temporada', 'estadia'],
  openGraph: {
    title: 'UrbanHost',
    description: 'Encontre hospedagens diferenciadas no Brasil e no mundo com a UrbanHost.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UrbanHost',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-gray-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
        
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
