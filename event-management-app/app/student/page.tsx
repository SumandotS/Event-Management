"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { enrollInEvent } from "./actions"

type Student = {
  id: string
  name: string
  email: string
  eventId: string
}

export default function StudentDashboard() {
  const [events, setEvents] = useState([])
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([])
  const [state, formAction] = useFormState(enrollInEvent, null)

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))

    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => setEnrolledStudents(data))
  }, [])

  useEffect(() => {
    if (state?.message === "Enrolled successfully") {
      fetch("/api/students")
        .then((response) => response.json())
        .then((data) => setEnrolledStudents(data))
    }
  }, [state])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {state?.message && (
        <div className={`p-4 mb-4 ${state.message.includes("success") ? "bg-green-100" : "bg-red-100"}`}>
          {state.message}
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
              <form action={formAction} className="space-y-4 w-full">
                <input type="hidden" name="eventId" value={event.id} />
                <Input type="text" name="name" placeholder="Your Name" required />
                <Input type="email" name="email" placeholder="Your Email" required />
                <Input type="tel" name="phone" placeholder="Your Phone Number" required />
                <Button type="submit" className="w-full">
                  Enroll
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Enrolled Students</h2>
      <div className="grid gap-4">
        {enrolledStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="font-bold">{student.name}</p>
                <p>{student.email}</p>
              </div>
              <p>Event ID: {student.eventId}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

