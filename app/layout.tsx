import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, Geist } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

// 1. Tambahkan konfigurasi Open Graph di Metadata
export const metadata: Metadata = {
  title: 'Gereja Pintar — Platform Digital Manajemen Gereja Terpadu',
  description:
    'Gereja Pintar menyatukan dashboard admin, bot WhatsApp AI, dan portal jemaat dalam satu platform untuk mengelola gereja modern dengan mudah, aman, dan terintegrasi.',
  openGraph: {
    siteName: 'Gereja Pintar',
    url: 'https://www.domainkamu.com', // Ganti dengan URL aslimu
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1e3a5f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  // 2. Setup JSON-LD untuk memunculkan nama situs di Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gereja Pintar',
    alternateName: 'GerejaPintar', // Opsional: nama tanpa spasi atau singkatan
    url: 'https://www.gerejapintar.id/', // Ganti dengan URL aslimu
  }

  return (
    <html lang="id" className={cn("bg-background", inter.variable, fraunces.variable, "font-sans", geist.variable)}>
      {/* Tambahkan tag <head> untuk menyisipkan skrip JSON-LD */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
