import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
  try {
    // Insert mock genres
    const genre1 = await prisma.genre.create({
      data: {
        name: "Action",
      },
    });

    const genre2 = await prisma.genre.create({
      data: {
        name: "Comedy",
      },
    });

    // Insert mock movies with their genres
    const movie1 = await prisma.movie.create({
      data: {
        title: "Movie 1",
        year: 2020,
        director: "Director 1",
        duration: 120,
        poster: "poster1.jpg",
        rate: 7.5,
        genres: {
          connect: [{ id: genre1.id }],
        },
      },
    });

    const movie2 = await prisma.movie.create({
      data: {
        title: "Movie 2",
        year: 2021,
        director: "Director 2",
        duration: 110,
        poster: "poster2.jpg",
        rate: 8.0,
        genres: {
          connect: [{ id: genre1.id }, { id: genre2.id }],
        },
      },
    });

    console.log("Seeder completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
