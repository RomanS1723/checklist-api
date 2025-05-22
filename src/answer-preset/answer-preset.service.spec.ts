import { Test, TestingModule } from '@nestjs/testing';
import { AnswerPresetService } from './answer-preset.service';

describe('AnswerPresetService', () => {
  let service: AnswerPresetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerPresetService],
    }).compile();

    service = module.get<AnswerPresetService>(AnswerPresetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
