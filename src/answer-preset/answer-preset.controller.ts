import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/dto/user';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { AnswerPresetService } from './answer-preset.service';

@Controller('admin/answer-preset')
@UseGuards(AuthGuard, RoleGuard)
@Role(Roles.ADMIN)
export class AnswerPresetController {
  constructor(private readonly answerPresetService: AnswerPresetService) {}

  @Get()
  @Role(Roles.ADMIN, Roles.USER)
  async getPreset() {
    return await this.answerPresetService.getPresetAnswers();
  }

  @Get(':/id')
  async getPresetAnswer(id: number) {
    return await this.answerPresetService.getPresetAnswer(id);
  }
}
