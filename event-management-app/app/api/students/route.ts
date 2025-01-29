import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const students = await prisma.student.findMany({
    include: {
      enrollments: {
        select: {
          eventId: true,
        },
      },
    },
  })

  const formattedStudents = students.map((student) => ({
    id: student.id,
    name: student.name,
    email: student.email,
    eventId: student.enrollments[0]?.eventId,
  }))

  return NextResponse.json(formattedStudents)
}

