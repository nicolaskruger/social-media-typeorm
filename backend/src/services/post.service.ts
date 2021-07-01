import { CreateCommentDto } from '@/dtos/comment.dto';
import { CreatePostDto, PostResponseDto } from '@/dtos/post.dto';
import { CommentsEntity } from '@/entity/comments.entity';
import { PostEntity } from '@/entity/post.entity';
import { UserEntity } from '@/entity/users.entity';
import HttpException from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { CommentMapper } from '@/mapper/comment.mapper';
import { PostMapper } from '@/mapper/post.mapper';
import { PostRepository } from '@/repository/post.repository';
import { isEmpty } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { CommentService } from './comment.service';
import UserService from './users.service';

class PostService {
  readonly pageLength = 3;
  private posts = PostRepository;
  private postMapper = new PostMapper();
  private userService = new UserService();
  private commentMapper = new CommentMapper();
  private commentService = new CommentService();

  public async createPost(postData: CreatePostDto, user: User) {
    if (isEmpty(postData)) throw new HttpException(400, 'You are note a post data');

    const postRepository = getCustomRepository(this.posts);

    const post = this.postMapper.toPostFromCreateDto(postData, user);

    const create = await postRepository.save(post);

    return create;
  }
  private toFriendList(userE: UserEntity[], id: number) {
    return [...userE.map(user => user.id), id];
  }

  private async postsCompleteInfo(posts: PostEntity[]) {
    const newPosts = await posts.map(this.postCompleteInfo);
    return newPosts;
  }
  private postCompleteInfo = async (post: PostEntity) => {
    const commentService = this.commentService;

    const getComment = async (comments: CommentsEntity[]) =>
      comments.map(async comment => {
        return await commentService.findById(comment.id);
      });

    const comments = await getComment(post.comments);

    const newComment = await Promise.all(comments);

    return {
      ...post,
      comments: newComment,
    };
  };

  private async feed(user: User, page: number): Promise<[PostEntity[], number]> {
    const postRepository = getCustomRepository(this.posts);
    const userEntyty = await this.userService.getUserAndInfo(user.id);

    const friend1Id = this.toFriendList(userEntyty.friends01, userEntyty.id);

    const posts = await postRepository.feed(friend1Id, page);

    const postsInfo = await Promise.all(await this.postsCompleteInfo(posts[0]));

    return [postsInfo, posts[1]];
  }

  private postToResposne(posts: PostEntity[], user: User, count: number): [PostResponseDto[], number] {
    const newPost = posts.map(post => this.postMapper.toPostResponse(post, user));

    return [newPost, count];
  }

  public async feedResponse(user: User, page: number): Promise<[PostResponseDto[], number]> {
    const posts = await this.feed(user, page);

    return this.postToResposne(posts[0], user, posts[1]);
  }

  private async personalPage(user: User, postOwnerId: number, page: number) {
    const userOwner = await this.userService.getUserAndInfo(postOwnerId);

    const postRepository = getCustomRepository(this.posts);

    const friendList = this.toFriendList(userOwner.friends01, userOwner.id);

    const isFriend = friendList.includes(user.id);

    const posts = await postRepository.personalPage(user.id, isFriend, page);
    return posts;
  }

  public async personalPageResponse(user: User, postOwnerId: number, page: number) {
    const posts = await this.personalPage(user, postOwnerId, page);

    return this.postToResposne(posts[0], user, posts[1]);
  }

  public async findPostById(id: number): Promise<PostEntity> {
    const postRepository = getCustomRepository(this.posts);

    const post = await postRepository.findById(id);

    if (!post) throw new HttpException(409, "Post whith thad id dosn't exists");

    return await this.postCompleteInfo(post);
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

  private async dislike(user: User, post: PostEntity) {
    const postRepository = getCustomRepository(this.posts);

    post.likes = post.likes.filter(userLike => userLike.id !== user.id);

    await postRepository.save(post);
  }

  private async like(user: User, post: PostEntity) {
    const postRepository = getCustomRepository(this.posts);

    const userEntity = await this.userService.findUserById(user.id);

    post.likes.push(userEntity);

    await postRepository.save(post);
  }

  public async toggleLike(user: User, postId: number) {
    const post = await this.findPostById(postId);

    await this.canInteractWithThisPost(user, post);

    const liked = post.likes.map(user => user.id).includes(user.id);

    if (liked) {
      await this.dislike(user, post);
    } else {
      await this.like(user, post);
    }
  }
}

export { PostService };
