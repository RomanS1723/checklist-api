import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Answer, AnswerType } from 'src/dto/answer';

@Injectable()
export class AnswerPresetGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const answer = request.body as Answer;
    // this.isAnswerTypeValid(answer);
    return true;
  }

  private isAnswerTypeValid(answer: Answer): void {
    if (answer.type === AnswerType.CORRECT) {
      if (!answer.correct) {
        throw new ConflictException(
          '"type": "correct" requires a field with the name "correct" and the type boolean',
        );
      }
    }
    if (answer.type === AnswerType.COUNT) {
      if (typeof answer.count !== 'number') {
        throw new ConflictException(
          '"type": "count" requires a field with the name "count" and the type number',
        );
      }
    }
    if (answer.type === AnswerType.DESCRIPTION) {
      if (!answer.description) {
        throw new ConflictException(
          '"type": "description" requires a field with the name "description" and the type string',
        );
      }
    }
  }
}
