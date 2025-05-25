import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Answer } from 'src/dto/answer';

@Injectable()
export class AnswerPresetService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    await this.ensureSettingsExists();
  }

  async getPresetAnswers(): Promise<Answer[]> {
    return (
      await this.databaseService.settings.findFirst({
        include: { referenceQuestions: true },
      })
    ).referenceQuestions as Answer[];
    // return (await this.databaseService.answer.findMany({
    //   where: { settingsId: { not: null } },
    // })) as Answer[];
  }

  async getPresetAnswer(id: number): Promise<Answer> {
    return (await this.getPresetAnswers()).find((el: Answer) => el.id === id);
    // return (await this.databaseService.answer.findUnique({
    //   where: { id, settingsId: { not: null } },
    // })) as Answer;
  }

  async addPresetAnswer(answer: Answer): Promise<Answer> {
    const { type, fieldDescription, correct, description, count } = answer;
    return (await this.databaseService.answer.create({
      data: {
        type,
        fieldDescription,
        correct,
        description,
        count,
        settingsId: (await this.databaseService.settings.findFirst()).id,
      },
    })) as Answer;
  }

  // async updatePresetAnswer(answer: Answer): Promise<Answer> {
  //   return (await this.databaseService.answer.update({})) as Answer;
  // }
  // async removePresetAnswer(id: number): Promise<void> {}

  private async ensureSettingsExists() {
    if (!(await this.databaseService.settings.findFirst())) {
      await this.databaseService.settings.create({ data: {} });
    }
  }
}
