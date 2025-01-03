import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavigationBar from '@/components/NavigationBar'
import './globals.css'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YopiNopi',
  description: 'YopiNopi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FBF7EF] min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Providers>{children}</Providers>
          </main>
          <NavigationBar />
        </div>
      </body>
    </html>
  )
}
