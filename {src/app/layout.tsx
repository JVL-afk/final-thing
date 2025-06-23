import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AFFILIFY - AI-Powered Affiliate Website Generator',
  description: 'Create professional affiliate marketing websites instantly with AI. Generate high-converting landing pages, manage affiliate links, and track performance all in one platform.',
  keywords: 'affiliate marketing, website generator, AI, landing pages, affiliate links',
  authors: [{ name: 'AFFILIFY Team' }],
  openGraph: {
    title: 'AFFILIFY - AI-Powered Affiliate Website Generator',
    description: 'Create professional affiliate marketing websites instantly with AI',
    url: 'https://affilify.eu',
    siteName: 'AFFILIFY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AFFILIFY - AI-Powered Affiliate Website Generator',
    description: 'Create professional affiliate marketing websites instantly with AI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
