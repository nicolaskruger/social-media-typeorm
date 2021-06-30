import { CreateCommentDto } from '@/dtos/comment.dto';
import { CreatePostDto } from '@/dtos/post.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PostService } from '@/services/post.service';
import { NextFunction, Response } from 'express';

class PostController {
  public postService = new PostService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const createPostDto: CreatePostDto = req.body;

      const ret = await this.postService.createPost(createPostDto, user);

      res.status(201).json(ret);
    } catch (error) {
      next(error);
    }
  };

  public feed = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const page = Number(req.query.page);
      const ret = await this.postService.feed(user, page);
      res.status(200).json(ret);
    } catch (error) {
      next(error);
    }
  };
  public personalPage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const page = Number(req.query.page);
      const id = Number(req.query.id);
      const ret = await this.postService.personalPage(user, id, page);
      res.status(200).json(ret);
    } catch (error) {
      next(error);
    }
  };

  public addComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const createComment: CreateCommentDto = req.body;
      const id = Number(req.query.id);
      const ret = await this.postService.addComment(createComment, user, id);
      res.status(201).json(ret);
    } catch (error) {
      next(error);
    }
  };
}

export { PostController };
