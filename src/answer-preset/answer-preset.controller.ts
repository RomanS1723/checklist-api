import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/dto/user';
import { Role } from 'src/role/role.decorator';
import { AnswerPresetService } from './answer-preset.service';
import { Answer } from 'src/dto/answer';
import { RoleGuard } from 'src/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Role(Roles.ADMIN)
@Controller('answer-preset')
export class AnswerPresetController {
  constructor(private readonly answerPresetService: AnswerPresetService) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.ADMIN, Roles.USER)
  async getPreset() {
    return await this.answerPresetService.getPresetAnswers();
  }

  @Get('admin/:/id')
  async getPresetAnswer(id: number) {
    return await this.answerPresetService.getPresetAnswer(id);
  }

  @Post('admin/')
  async addPresetAnswer(@Body() answer: Answer) {
    //TODO: add validation by AnswerType
    return await this.answerPresetService.addPresetAnswer(answer);
  }
}
