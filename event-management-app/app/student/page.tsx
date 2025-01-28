'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { enrollInEvent } from './actions'

export default function StudentDashboard() {
  const [events, setEvents] = useState([])
  const [state, formAction] = useFormState(enrollInEvent, null)

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
  }, [])

  useEffect(() => {
    if (state?.message === 'Enrolled successfully') {
      // Refresh the events list after successful enrollment
      fetch('/api/events')
        .then(response => response.json())
        .then(data => setEvents(data))
    }
  }, [state])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {state?.message && (
        <div className={`p-4 mb-4 ${state.message.includes('success') ? 'bg-green-100' : 'bg-red-100'}`}>
          <p>{state.message}</p>
          {state.error && <p className="mt-2 text-sm text-red-600">Error details: {state.error}</p>}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{event.description}</p>
            </CardContent>
            <CardFooter>
              <form action={formAction}>
                <input type="hidden" name="eventId" value={event.id} />
                <Button type="submit">Enroll</Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}