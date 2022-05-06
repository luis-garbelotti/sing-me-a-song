import { prisma } from '../src/database.js';

async function main() {
  await prisma.recommendation.upsert({
    where: {
      name: 'Like Sand',
    },
    update: {},
    create: {
      name: 'Like Sand',
      youtubeLink: 'https://www.youtube.com/watch?v=CMtGsrID-qM&ab_channel=InFlames-Topic',
      score: 0,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Sesto Sento - Lift Me Up',
    },
    update: {},
    create: {
      name: 'Sesto Sento - Lift Me Up',
      youtubeLink: 'https://www.youtube.com/watch?v=TqJgE0P4drE&ab_channel=arthurbrizzo',
      score: 0,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Edy Lemond - Madagascar (videoclipe oficial)',
    },
    update: {},
    create: {
      name: 'Edy Lemond - Madagascar (videoclipe oficial)',
      youtubeLink: 'https://www.youtube.com/watch?v=b3m9G4gADPQ&ab_channel=EdyLemond',
      score: 0,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
