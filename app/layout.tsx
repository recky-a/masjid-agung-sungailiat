import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Amiri, Salsa } from 'next/font/google';
import './globals.css';

const salsa = Salsa({
  subsets: ['latin'],
  variable: '--font-salsa',
  display: 'swap',
  weight: ['400'],
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Masjid Agung Sungailiat',
  description:
    'Situs resmi Masjid Agung Sungailiat, Kabupaten Bangka. Informasi kegiatan, jadwal sholat, dan lainnya.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${salsa.variable} ${amiri.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
