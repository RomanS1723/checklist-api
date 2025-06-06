import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AnswerService } from 'src/answer/answer.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Post as PostDto } from 'src/dto/post';
import { Answer } from 'src/dto/answer';
import { PostGuard } from './post.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly answerService: AnswerService,
    private readonly userService: UserService,
  ) {}

  @Get('my')
  async getMy(@Request() req: any) {
    const userId = (await this.userService.findByLogin(req.user.username)).id;
    console.log(userId);
    return await this.postService.getUserPosts(userId);
  }

  // TODO: Validate question with answer preset.
  @Post('start')
  @UseGuards(PostGuard)
  async create(@Request() req: any, @Body() post: PostDto) {
    post.id = null;
    post.userId = (await this.userService.findByLogin(req.user.username)).id;
    post.questions.forEach((el) => {
      el.id = null;
    });
    // console.log('post:', post);
    // TODO: clear post.userId
    // TODO: create post with start answers.
    return await this.postService.createPost(post);
  }

  @Patch('end/:postId')
  async updateEndAnswers(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() endAnswers: Answer[],
  ) {
    // TODO: update end answers
    await this.postService.addAnswers(postId, endAnswers);
  }
}
