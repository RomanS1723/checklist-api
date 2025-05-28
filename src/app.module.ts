import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnswerPresetModule } from './answer-preset/answer-preset.module';
import { PostModule } from './post/post.module';
import { AnswerService } from './answer/answer.service';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnswerPresetModule,
    PostModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AnswerService],
})
export class AppModule {}
