import { Module } from '@nestjs/common';
import { AnswerPresetService } from './answer-preset.service';
import { AnswerPresetController } from './answer-preset.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [AnswerPresetService],
  controllers: [AnswerPresetController],
  exports: [AnswerPresetService],
})
export class AnswerPresetModule {}
