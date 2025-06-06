import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AnswerPresetService } from 'src/answer-preset/answer-preset.service';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly answerPresetService: AnswerPresetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const preset = await this.answerPresetService.getPresetAnswers();
    const body = context.switchToHttp().getRequest().body;

    if (!body?.questions) {
      return false;
    }

    // console.log('preset:', preset);
    // console.log('body:', body.questions);
    return true;
  }
}
