import { Test, TestingModule } from '@nestjs/testing';
import { AnswerPresetController } from './answer-preset.controller';

describe('AnswerPresetController', () => {
  let controller: AnswerPresetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerPresetController],
    }).compile();

    controller = module.get<AnswerPresetController>(AnswerPresetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
