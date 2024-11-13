'use client'

import React, { Suspense } from 'react'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ConversationProvider } from '@/context/ConversationContext'
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

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
