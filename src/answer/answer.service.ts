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

  async getAllUsersAnswers() {
    return await this.databaseService.answer.findMany({
      where: {
        settingsId: null,
        Post: {
          userId: {
            not: null,
          },
          User: {
            role: {
              not: 'admin',
            },
          },
        },
      },
      select: {
        id: true,
        type: true,
        onBeforeStart: true,
        fieldDescription: true,
        correct: true,
        description: true,
        count: true,
        createdAt: true,
        Post: {
          select: {
            id: true,
            User: {
              select: {
                id: true,
                login: true,
                role: true,
              },
            },
          },
        },
      },
      take: 100,
    });
  }
}
