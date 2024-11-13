'use client'

import React, { Suspense } from 'react'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ConversationProvider } from '@/context/ConversationContext'
import { Analytics } from "@vercel/analytics/react"

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className={`font-sans ${inter.className} flex flex-col min-h-screen`}>
        <ConversationProvider>
          {children}
        </ConversationProvider>
        <Analytics />
      </body>
    </html>
  )
}
