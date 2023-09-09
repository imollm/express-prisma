import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { movies, genres } from "../../mockData.js";

const createdGenres = [];

try {
  for (let i = 0; i < genres.length; i++) {
    const createdGenre = await prisma.genre.create({
      data: {
        ...genres[i],
      },
    });
    createdGenres.push(createdGenre);
  }

  for (let i = 0; i < movies.length; i++) {
    await prisma.movie.create({
      data: {
        ...movies[i],
        genres: {
          connect: [
            {
              id: createdGenres[
                Math.floor(Math.random() * createdGenres.length)
              ].id,
            },
          ],
        },
      },
    });
  }
} catch (error: any) {
  console.error(`Error while seeding mysql database ${error.message}`);
} finally {
  await prisma.$disconnect();
}
