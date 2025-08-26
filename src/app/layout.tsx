
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/AppHeader';
import { CustomThemeProvider } from '@/components/ThemeProvider';
import GridBackground from '@/components/GridBackground';
import { AuthProvider } from '@/contexts/AuthContext';
import MobileBottomNav from '@/components/MobileBottomNav';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { Lexend } from 'next/font/google';
import { cn } from '@/lib/utils';
import AppFooter from '@/components/AppFooter';
import { usePathname } from 'next/navigation';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isEmbedRoute = pathname.startsWith('/embed');

  if (isEmbedRoute) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("font-sans antialiased", lexend.variable)}>
                {children}
            </body>
        </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <title>Toolsax - Free Online Tools for Developers & Designers</title>
          <meta name="description" content="An expanding collection of free online tools including case converters, password generators, QR code creators, and more. Fast, secure, and easy to use." />
          <meta name="keywords" content="online tools, developer tools, designer tools, free tools, case converter, password generator, qr code generator, json formatter" />
          <meta property="og:title" content="Toolsax - Free Online Tools for Developers & Designers" />
          <meta property="og:description" content="An expanding collection of free online tools for professionals." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://toolsax.vercel.app" />
          <meta property="og:site_name" content="Toolsax" />
          <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={cn("font-sans antialiased min-h-screen flex flex-col bg-background", lexend.variable)}>
        <AuthProvider>
          <CustomThemeProvider>
            <AppStateProvider>
              {!isAdminRoute && <GridBackground />}
              <div className="flex flex-col w-full flex-grow">
                  {!isAdminRoute && <AppHeader />}
                  <main className="flex-grow">
                      {children}
                  </main>
                  {!isAdminRoute && (
                    <>
                      <AppFooter />
                      <MobileBottomNav />
                    </>
                  )}
              </div>
              <Toaster />
            </AppStateProvider>
          </CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
