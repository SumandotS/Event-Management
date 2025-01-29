"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function enrollInEvent(prevState: any, formData: FormData) {
  try {
    const eventId = formData.get("eventId") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    if (!eventId || !name || !email || !phone) {
      throw new Error("Missing required fields")
    }

    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        enrollments: {
          create: {
            eventId,
          },
        },
      },
    })

    revalidatePath("/student")
    return { message: `Enrolled successfully: ${name} (${email})` }
  } catch (error) {
    console.error("Enrollment error:", error)
    return { message: "Failed to enroll", error: error.message }
  }
}

