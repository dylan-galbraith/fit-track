
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  // ... you will write your Prisma Client queries here
  const allExercises = await prisma.exercise.findMany()
  console.log(allExercises);
}
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })