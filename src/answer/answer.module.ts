import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AnswerService],
  exports: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
