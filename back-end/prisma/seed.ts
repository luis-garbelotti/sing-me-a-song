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
      name: 'Mr. Jack',
    },
    update: {},
    create: {
      name: 'Mr. Jack',
      youtubeLink: 'https://www.youtube.com/watch?v=J3XnZyz__oU&list=RDCMtGsrID-qM&index=3&ab_channel=SystemOfADown-Topic',
      score: 3,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Trivium - Until The World Goes Cold [OFFICIAL VIDEO]',
    },
    update: {},
    create: {
      name: 'Trivium - Until The World Goes Cold [OFFICIAL VIDEO]',
      youtubeLink: 'https://www.youtube.com/watch?v=pm-xlwkQ_qc&list=RDCMtGsrID-qM&index=12&ab_channel=Trivium',
      score: -4,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Sean Kingston - Beautiful Girls (Official HD Video)',
    },
    update: {},
    create: {
      name: 'Sean Kingston - Beautiful Girls (Official HD Video)',
      youtubeLink: 'https://www.youtube.com/watch?v=MrTz5xjmso4&ab_channel=seankingstonVEVO',
      score: 10,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Molejo - Dança da Vassoura',
    },
    update: {},
    create: {
      name: 'Molejo - Dança da Vassoura',
      youtubeLink: 'https://www.youtube.com/watch?v=j77Hbhvcu5w&ab_channel=Molejo',
      score: 15,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Lamb of God - Laid to Rest (Official HD Video)',
    },
    update: {},
    create: {
      name: 'Lamb of God - Laid to Rest (Official HD Video)',
      youtubeLink: 'https://www.youtube.com/watch?v=HL9kaJZw8iw&ab_channel=lambofgodVEVO',
      score: 13,
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
      score: 18,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Eminem - The Real Slim Shady (Official Video - Clean Version)',
    },
    update: {},
    create: {
      name: 'Eminem - The Real Slim Shady (Official Video - Clean Version)',
      youtubeLink: 'https://www.youtube.com/watch?v=eJO5HU_7_1w&ab_channel=EminemVEVO',
      score: -3,
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
      score: 5,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Gabriel o Pensador - Até Quando? (Clipe Oficial)',
    },
    update: {},
    create: {
      name: 'Gabriel o Pensador - Até Quando? (Clipe Oficial)',
      youtubeLink: 'https://www.youtube.com/watch?v=atXuxbc7zZk&ab_channel=GabrieloPensador',
      score: -4,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Gabriel O Pensador, Lulu Santos - Cachimbo Da Paz ft. Lulu Santos',
    },
    update: {},
    create: {
      name: 'Gabriel O Pensador, Lulu Santos - Cachimbo Da Paz ft. Lulu Santos',
      youtubeLink: 'https://www.youtube.com/watch?v=JRD_Zx-zFgE&ab_channel=GabrielOPensadorVEVO',
      score: 28,
    },
  });

  await prisma.recommendation.upsert({
    where: {
      name: 'Tim Maia – Ela Partiu (Official Audio)',
    },
    update: {
      name: 'Tim Maia – Ela Partiu (Official Audio)',
      youtubeLink: 'https://www.youtube.com/watch?v=syqJAgTQdlU&ab_channel=LuakaBop',
      score: 29,
    },
    create: {
      name: 'Tim Maia – Ela Partiu (Official Audio)',
      youtubeLink: 'https://www.youtube.com/watch?v=syqJAgTQdlU&ab_channel=LuakaBop',
      score: 29,
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
