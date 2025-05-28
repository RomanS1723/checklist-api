import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AnswerPresetModule } from 'src/answer-preset/answer-preset.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [DatabaseModule, AnswerPresetModule, UserModule, AnswerModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
