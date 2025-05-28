import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AnswerService } from 'src/answer/answer.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Post as PostDto } from 'src/dto/post';

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
    return await this.postService.getUserPosts(
      (await this.userService.findByLogin(req.user.username)).id,
    );
  }

  // TODO: Validate question with answer preset.
  @Post()
  async create(@Body() post: PostDto) {
    console.log(post);
    // TODO: clear post.userId
    // TODO: create post with start answers.
  }

  @Patch()
  async update(@Body() post: PostDto) {
    console.log(post);
    // TODO: update end answers
  }
}
