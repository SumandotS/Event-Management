'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}