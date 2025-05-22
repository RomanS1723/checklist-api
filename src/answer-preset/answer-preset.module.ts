import { Module } from '@nestjs/common';
import { AnswerPresetService } from './answer-preset.service';
import { AnswerPresetController } from './answer-preset.controller';

@Module({
  providers: [AnswerPresetService],
  controllers: [AnswerPresetController]
})
export class AnswerPresetModule {}
