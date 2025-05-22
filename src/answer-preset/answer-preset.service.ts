import { Injectable } from '@nestjs/common';
import { Answer } from 'src/dto/answer';

@Injectable()
export class AnswerPresetService {
  async getPresetAnswers(): Promise<Answer[]> {}
  async getPresetAnswer(id: number): Promise<Answer> {}
  async addPresetAnswer(answer: Answer): Promise<Answer> {}
  async updatePresetAnswer(answer: Answer): Promise<Answer> {}
  async removePresetAnswer(id: number): Promise<void> {}
}
