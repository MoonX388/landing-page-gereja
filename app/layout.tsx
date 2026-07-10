import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, Geist } from 'next/font/google'
import { AuthProvider, useAuth } from './context/AuthContext'
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

export const metadata: Metadata = {
  title: 'GerejaPintar — Platform Digital Manajemen Gereja Terpadu',
  description:
    'GerejaPintar menyatukan dashboard admin, bot WhatsApp AI, dan portal jemaat dalam satu platform untuk mengelola gereja modern dengan mudah, aman, dan terintegrasi.',
  generator: 'v0.app',
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
  return (
    <html lang="id" className={cn("bg-background", inter.variable, fraunces.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
