'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Event Management App</h1>
      <div className="space-x-4">
        <Link href="/organizer">
          <Button>Organizer Dashboard</Button>
        </Link>
        <Link href="/student">
          <Button>Student Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}