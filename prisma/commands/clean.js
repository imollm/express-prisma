import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();

  try {
    // Delete all records in the MoviesOnGenres table
    await prisma.moviesOnGenres.deleteMany();

    // Delete all records in the Movie table
    await prisma.movie.deleteMany();

    // Delete all records in the Genre table
    await prisma.genre.deleteMany();

    console.log("Mock data cleaned successfully.");
  } catch (error) {
    console.error("Error cleaning mock data:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
