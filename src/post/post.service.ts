import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Post } from 'src/dto/post';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserPosts(userId: number): Promise<Post[]> {
    return (await this.databaseService.post.findMany({
      where: {
        userId,
      },
      include: {
        questions: true,
      },
    })) as Post[];
  }

  async getPost(postId: number): Promise<Post> {
    return (await this.databaseService.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        questions: true,
      },
    })) as Post;
  }

  async createPost(post: Post): Promise<Post> {
    const { title, description, questions } = post;
    const createdPost = await this.databaseService.post.create({
      data: {
        title,
        description,
      },
    });
    await this.databaseService.answer.createMany({
      data: questions.map((answer) => ({
        type: answer.type,
        onBeforeStart: answer.onBeforeStart,
        fieldDescription: answer.fieldDescription,
        correct: answer.correct,
        description: answer.description,
        count: answer.count,
        postId: createdPost.id,
      })),
    });
    return await this.getPost(createdPost.id);
  }

  async deletePost(postId: number): Promise<void> {
    await this.databaseService.answer.deleteMany({
      where: {
        postId,
      },
    });
    await this.databaseService.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
