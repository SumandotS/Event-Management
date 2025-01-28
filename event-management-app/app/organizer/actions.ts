'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addEvent(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string

  await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
    },
  })

  revalidatePath('/organizer')
  revalidatePath('/student')
}