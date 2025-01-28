import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create some sample events
  const event1 = await prisma.event.create({
    data: {
      title: 'Introduction to React',
      description: 'Learn the basics of React in this beginner-friendly workshop',
      date: new Date('2023-08-15T14:00:00Z'),
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Advanced JavaScript Techniques',
      description: 'Explore advanced concepts in JavaScript for experienced developers',
      date: new Date('2023-08-22T15:30:00Z'),
    },
  })

  // Create a sample student
  const student = await prisma.student.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  })

  // Enroll the student in the first event
  await prisma.enrollment.create({
    data: {
      eventId: event1.id,
      studentId: student.id,
    },
  })

  console.log('Seed data created successfully!')
  console.log({ event1, event2, student })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })