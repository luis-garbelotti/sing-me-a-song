import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";
import recommendationsFactory from "../factories/recommendationsFactory.js";

describe('Tests: Recommendations Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should throw conflict error given duplicate name', async () => {
    const recommendation = recommendationsFactory();

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue({
      id: 1,
      ...recommendation[0],
    });

    expect(async () => {
      await recommendationService.insert(recommendation[0]);
    }).rejects.toEqual(conflictError('Recommendations names must be unique'));
  });

  it('should throw not found error at getRandom', async () => {
    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

    expect(async () => {
      await recommendationService.getRandom();
    }).rejects.toEqual(notFoundError());
  });
});
