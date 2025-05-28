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
  }

  async getPresetAnswer(id: number): Promise<Answer> {
    return (await this.getPresetAnswers()).find((el: Answer) => el.id === id);
  }

  async addPresetAnswer(answer: Answer): Promise<Answer> {
    const {
      type,
      onBeforeStart,
      fieldDescription,
      correct,
      description,
      count,
    } = answer;
    return (await this.databaseService.answer.create({
      data: {
        type,
        onBeforeStart,
        fieldDescription,
        correct,
        description,
        count,
        settingsId: 1,
      },
    })) as Answer;
  }

  async updatePresetAnswer(answer: Answer): Promise<Answer> {
    return (await this.databaseService.answer.update({
      where: { id: answer.id },
      data: answer,
    })) as Answer;
  }

  async removePresetAnswer(id: number): Promise<void> {
    await this.databaseService.answer.delete({ where: { id } });
  }

  private async ensureSettingsExists() {
    if (
      !(await this.databaseService.settings.findFirst({ where: { id: 1 } }))
    ) {
      console.log('Settings not found, creating...');
      await this.databaseService.settings.create({ data: {} });
    }
  }

  public async isAnswerLinkedToSettings(answerId: number): Promise<boolean> {
    const answer = await this.databaseService.answer.findUnique({
      where: { id: answerId },
      include: { Settings: true },
    });
    return !!(answer && answer.Settings);
  }
}
