import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FireApp - Next.js + Firebase Starter Template',
  description: 'A modern web application starter template built with Next.js, Firebase, and TypeScript',
  keywords: ['Next.js', 'Firebase', 'React', 'TypeScript', 'Starter Template', 'Web App'],
  authors: [{ name: 'FireApp' }],
  creator: 'FireApp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fireapp-starter.vercel.app',
    title: 'FireApp - Next.js + Firebase Starter Template',
    description: 'A modern web application starter template built with Next.js, Firebase, and TypeScript',
    siteName: 'FireApp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FireApp - Next.js + Firebase Starter Template',
    description: 'A modern web application starter template built with Next.js, Firebase, and TypeScript',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}