import { Controller, Get } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('answers')
  async getAll() {
    return await this.answerService.getAllUsersAnswers();
  }
}
