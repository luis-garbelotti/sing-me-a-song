import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';
import recommendationsFactory from '../factories/recommendationsFactory.js';

async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

async function disconnect() {
  await prisma.$disconnect();
}

describe('Sing me a song Integrations tests', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  describe('Up vote: POST /recommendations/:id/upvote', () => {
    it('should increase a vote when up vote and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations.name,
        },
        update: {},
        create: {
          ...recommendations,
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/upvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body.score).toEqual(recommendations.score + 1);
    });
  });

  describe('Down vote: POST /recommendations/:id/downvote', () => {
    it('should decrease a vote when down vote and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations.name,
        },
        update: {},
        create: {
          ...recommendations,
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/downvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body.score).toEqual(recommendations.score - 1);
    });

    it('should delete recommendation when score < -5 and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations.name,
        },
        update: {},
        create: {
          ...recommendations,
          score: -5,
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/downvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body).toEqual({});
    });
  });
});
