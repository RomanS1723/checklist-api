import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Answer } from 'src/dto/answer';

@Injectable()
export class AnswerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updateAnswer(id: number, answer: Answer) {
    const {
      type,
      onBeforeStart,
      fieldDescription,
      correct,
      description,
      count,
    } = answer;
    return await this.databaseService.answer.update({
      where: {
        id,
      },
      data: {
        type,
        onBeforeStart,
        fieldDescription,
        correct,
        description,
        count,
      },
    });
  }
}
