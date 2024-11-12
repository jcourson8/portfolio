import React, { Suspense } from 'react'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ConversationProvider } from '@/context/ConversationContext'

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
      <body className={`font-sans ${inter.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
