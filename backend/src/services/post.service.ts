import { CreateCommentDto } from '@/dtos/comment.dto';
import { CreatePostDto } from '@/dtos/post.dto';
import { PostEntity } from '@/entity/post.entity';
import { UserEntity } from '@/entity/users.entity';
import HttpException from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { CommentMapper } from '@/mapper/comment.mapper';
import { PostMapper } from '@/mapper/post.mapper';
import { PostRepository } from '@/repository/post.repository';
import { isEmpty } from 'class-validator';
import { getCustomRepository, getRepository } from 'typeorm';
import { CommentService } from './comment.service';
import UserService from './users.service';

class PostService {
  readonly pageLength = 3;
  private posts = PostRepository;
  private postMaper = new PostMapper();
  private userService = new UserService();
  private commentMapper = new CommentMapper();
  private commentService = new CommentService();

  public async createPost(postData: CreatePostDto, user: User) {
    if (isEmpty(postData)) throw new HttpException(400, 'You are note a post data');

    const postRepository = getCustomRepository(this.posts);

    const post = this.postMaper.toPostFromCreateDto(postData, user);

    const create = await postRepository.save(post);

    return create;
  }
  private toFriendList(userE: UserEntity[], id: number) {
    return [...userE.map(user => user.id), id];
  }
  public async feed(user: User, page: number) {
    const postRepository = getCustomRepository(this.posts);
    const userEntyty = await this.userService.getUserAndInfo(user.id);

    const friend1Id = this.toFriendList(userEntyty.friends01, userEntyty.id);

    const posts = await postRepository.feed(friend1Id, page);
    return posts;
  }

  public async personalPage(user: User, postOwnerId: number, page: number) {
    const userOwner = await this.userService.getUserAndInfo(postOwnerId);

    const postRepository = getCustomRepository(this.posts);

    const friendList = this.toFriendList(userOwner.friends01, userOwner.id);

    const isFriend = friendList.includes(user.id);

    const posts = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .where(`post.user.id = :id and ( post.public = true or :isFriend = true ) `, { id: postOwnerId, isFriend })
      .orderBy({
        'post.createAt': 'DESC',
      })
      .skip(page * this.pageLength)
      .take(this.pageLength)
      .getManyAndCount();
    return posts;
  }

  public async findPostById(id: number) {
    const postRepository = getRepository(this.posts);

    const post = await postRepository.find({
      where: {
        id,
      },
      join: {
        alias: 'post',
        leftJoinAndSelect: {
          comments: 'post.comments',
          user: 'post.user',
        },
      },
      take: 1,
    });

    if (!post) throw new HttpException(409, "Post whith thad id dosn't exists");

    return post[0];
  }

  public async canInteractWithThisPost(user: User, post: PostEntity) {
    const postOwner = await this.userService.getUserAndInfo(post.user.id);

    const friends = this.toFriendList(postOwner.friends01, postOwner.id);

    const allowed = post.public || friends.includes(user.id);

    if (!allowed) throw new HttpException(401, "You can't interact with this post");
  }

  public async addComment(comment: CreateCommentDto, user: User, postId: number) {
    const userEntity = await this.userService.getUserAndInfo(user.id);

    const newComment = this.commentMapper.toEntityFromCreateDto(comment, userEntity);

    const post = await this.findPostById(postId);

    await this.canInteractWithThisPost(user, post);

    newComment.post = post;

    await this.commentService.save(newComment);
  }
}

export { PostService };
