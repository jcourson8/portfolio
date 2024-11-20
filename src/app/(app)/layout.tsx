import React, { Suspense } from 'react'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ConversationProvider } from '@/context/ConversationContext'
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'James Courson | Chat',
    template: '%s | James Courson'
  },
  description: 'Software engineer specializing in AI, cybersecurity, and full-stack development.',
  keywords: ['Software Engineer', 'AI', 'Cybersecurity', 'Full Stack Developer', 'Python', 'TypeScript'],
  authors: [{ name: 'James Courson' }],
  creator: 'James Courson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://james-courson.vercel.app',
    siteName: 'James Courson',
    title: 'James Courson | Chat',
    description: 'Software engineer specializing in AI, cybersecurity, and full-stack development.',
    images: [
      {
        url: '/og-image.png', // Add your OG image
        width: 2596,
        height: 1892,
        alt: 'James Courson'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <Head>
        {/* Ensures the app uses the entire viewport, including safe areas */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        {/* Add any additional meta tags here */}
      </Head>
      <body className={`font-sans ${inter.className} flex flex-col`}>
        <ConversationProvider>
          {children}
        </ConversationProvider>
        <Analytics />
      </body> 
    </html>
  )
}
