'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function enrollInEvent(prevState: any, formData: FormData) {
  try {
    const eventId = formData.get('eventId')
    if (typeof eventId !== 'string') {
      throw new Error('Invalid event ID')
    }

    // In a real app, you'd get the student ID from the session
    // For now, we'll create a new student for each enrollment
    const student = await prisma.student.create({
      data: {
        name: 'Test Student',
        email: `student_${Date.now()}@example.com`,
      },
    })

    const enrollment = await prisma.enrollment.create({
      data: {
        eventId,
        studentId: student.id,
      },
    })

    console.log('Enrollment created:', enrollment)

    revalidatePath('/student')
    return { message: 'Enrolled successfully', enrollment }
  } catch (error) {
    console.error('Enrollment error:', error)
    return { message: 'Failed to enroll', error: error.message }
  }
}