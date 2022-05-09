/* eslint-disable no-undef */
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

  describe('POST /recommendations', () => {
    it('should return status 422 given an invalid schema: invalid name', async () => {
      const recommendationEmptyName = {
        name: '',
        youtubeLink: 'https://www.youtube.com/watch?v=CMtGsrID-qM&ab_channel=InFlames-Topic',
      };

      const createdRecommendation = await supertest(app).post('/recommendations').send(recommendationEmptyName);

      expect(createdRecommendation.status).toEqual(422);
    });

    it('should return status 422 given an invalid schema: invalid youtube link', async () => {
      const recommendationEmptyLink = {
        name: 'Molejo - Dança da Vassoura',
        youtubeLink: '',
      };

      const recommendationInvalidLink = {
        name: 'Lamb of God - Laid to Rest (Official HD Video)',
        youtubeLink: 'https://google.com',
      };

      const createdRecommendationEmptyLink = await supertest(app).post('/recommendations').send(recommendationEmptyLink);
      const createdRecommendationInvalidLink = await supertest(app).post('/recommendations').send(recommendationInvalidLink);

      expect(createdRecommendationEmptyLink.status).toEqual(422);
      expect(createdRecommendationInvalidLink.status).toEqual(422);
    });
  });

  describe('Up vote: POST /recommendations/:id/upvote', () => {
    it('should increase a vote when up vote and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations[0].name,
        },
        update: {},
        create: {
          ...recommendations[0],
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/upvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body.score).toEqual(recommendations[0].score + 1);
    });
  });

  describe('Down vote: POST /recommendations/:id/downvote', () => {
    it('should decrease a vote when down vote and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations[1].name,
        },
        update: {},
        create: {
          ...recommendations[1],
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/downvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body.score).toEqual(recommendations[1].score - 1);
    });

    it('should delete recommendation when score < -5 and return status 200', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations[0].name,
        },
        update: {},
        create: {
          ...recommendations[0],
          score: -5,
        },
      });

      const postResponse = await supertest(app).post(`/recommendations/${createdRecommendation.id}/downvote`);
      const getResponse = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(postResponse.status).toEqual(200);
      expect(getResponse.body).toEqual({});
      expect(getResponse.status).toEqual(404);
    });
  });

  describe('GET /recommendations', () => {
    it('should return status 200 and an array with lenght less or equal 10', async () => {
      const recommendations = recommendationsFactory();

      await prisma.recommendation.createMany({
        data: [...recommendations],
      });

      const lastTenRecommendations = await supertest(app).get('/recommendations');

      expect(lastTenRecommendations.status).toEqual(200);
      expect(lastTenRecommendations.body.length).toBeLessThan(11);
      expect(lastTenRecommendations.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /recommendations/:id', () => {
    it('should return status 200 and a recommendation whith id equal path id', async () => {
      const recommendations = recommendationsFactory();

      const createdRecommendation = await prisma.recommendation.upsert({
        where: {
          name: recommendations[0].name,
        },
        update: {},
        create: {
          name: recommendations[0].name,
          youtubeLink: recommendations[0].youtubeLink,
          score: recommendations[0].score,
        },
      });

      const selectedRecommendation = await supertest(app).get(`/recommendations/${createdRecommendation.id}`);

      expect(selectedRecommendation.status).toEqual(200);
      expect(selectedRecommendation.body.id).toEqual(createdRecommendation.id);
    });
  });

  describe('GET /recommendations/top/:amount', () => {
    it('should return status 200 and an array with the amount most voted recommendation', async () => {
      const recommendations = recommendationsFactory();
      const amount = Math.floor(Math.random() * 19);
      let isOrdered = true;

      await prisma.recommendation.createMany({
        data: [...recommendations],
      });

      const selectedRecommendation = await supertest(app).get(`/recommendations/top/${amount}`);

      for (let i = 0; i < selectedRecommendation.body.lenght; i++) {
        if (i === selectedRecommendation.body.lenght - 1) {
          return;
        }

        if (selectedRecommendation.body[i] < selectedRecommendation.body[i + 1]) {
          isOrdered = false;
        }
      }

      expect(selectedRecommendation.status).toEqual(200);
      expect(isOrdered).toEqual(true);
      expect(selectedRecommendation.body.length).toBeLessThanOrEqual(amount);
    });
  });

  describe('GET /recommendations/random', () => {
    it('should return status 200 and a random recommendation', async () => {
      const recommendations = recommendationsFactory();

      await prisma.recommendation.createMany({
        data: [...recommendations],
      });

      const randomRecommendation = await supertest(app).get('/recommendations/random');

      expect(randomRecommendation.status).toEqual(200);
      expect(randomRecommendation.body).toHaveProperty('youtubeLink');
      expect(randomRecommendation.body).toHaveProperty('name');
      expect(randomRecommendation.body).toHaveProperty('score');
    });
  });
});
