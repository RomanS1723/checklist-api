import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/dto/user';
import { Role } from 'src/role/role.decorator';
import { AnswerPresetService } from './answer-preset.service';
import { Answer } from 'src/dto/answer';
import { RoleGuard } from 'src/role/role.guard';
import { AnswerPresetGuard } from './answer-preset.guard';

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

  @Get('admin/:id')
  async getPresetAnswer(@Param('id', ParseIntPipe) id: number) {
    await this.checkSettingsLink(id);
    return await this.answerPresetService.getPresetAnswer(id);
  }

  @Post('admin')
  @UseGuards(AnswerPresetGuard)
  async addPresetAnswer(@Body() answer: Answer) {
    return await this.answerPresetService.addPresetAnswer(answer);
  }

  @Put('admin/:id')
  @UseGuards(AnswerPresetGuard)
  async updatePresetAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() answer: Answer,
  ) {
    await this.checkSettingsLink(id);
    answer.id = id;
    return await this.answerPresetService.updatePresetAnswer(answer);
  }

  @Delete('admin/:id')
  @UseGuards(AnswerPresetGuard)
  async deletePresetAnswer(@Param('id', ParseIntPipe) id: number) {
    await this.checkSettingsLink(id);
    await this.answerPresetService.removePresetAnswer(id);
  }

  private async checkSettingsLink(id: number) {
    if (!(await this.answerPresetService.isAnswerLinkedToSettings(id))) {
      throw new ConflictException(
        'Answer is not linked to settings or does not exist.',
      );
    }
  }
}
