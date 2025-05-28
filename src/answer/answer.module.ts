import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnswerService } from './answer.service';

@Module({
  imports: [DatabaseModule],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
