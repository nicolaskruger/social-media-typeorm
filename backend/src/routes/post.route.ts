import { PostController } from '@/controllers/post.controller';
import Route from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { CreatePostDto } from '@/dtos/post.dto';
import { IdPageQueryDto, IdQueryDto, PageQueryDto } from '@/dtos/query.dto';
import { CreateCommentDto } from '@/dtos/comment.dto';

class PostRoute implements Route {
  public path = '/post';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body'), authMiddleware, this.postController.create);
    this.router.get(`${this.path}/feed`, validationMiddleware(PageQueryDto, 'query'), authMiddleware, this.postController.feed);
    this.router.get(`${this.path}/page`, validationMiddleware(IdPageQueryDto, 'query'), authMiddleware, this.postController.personalPage);
    this.router.post(
      `${this.path}/comment`,
      validationMiddleware(IdQueryDto, 'query'),
      validationMiddleware(CreateCommentDto, 'body'),
      authMiddleware,
      this.postController.addComment,
    );
  }
}

export { PostRoute };
