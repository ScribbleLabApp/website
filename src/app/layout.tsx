import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ConsentBanner } from '@/components/ui/cookie-banner';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ScribbleLabApp',
  description: 'A powerful note-taking and productivity tool to boost your creativity and learning.',
  openGraph: {
    title: 'ScribbleLabApp',
    description: 'A powerful note-taking and productivity tool to boost your creativity and learning.',
    url: 'https://scribblelabapp.pages.dev/',
    images: [
      {
        url: 'https://scribblelabapp.pages.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'ScribbleLabApp Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScribbleLabApp',
    description: 'A powerful note-taking and productivity tool to boost your creativity and learning.',
    images: ['https://scribblelabapp.pages.dev/og.png'],
    site: '@scribblelabapp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ConsentBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
