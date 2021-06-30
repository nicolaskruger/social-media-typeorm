import { PostEntity } from '@/entity/post.entity';
import { EntityRepository, In, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  private readonly pageLength = 10;

  public async feed(ids: number[], page: number) {
    const posts = await this.findAndCount({
      relations: ['user', 'comments', 'likes'],
      where: {
        user: { id: In([...ids]) },
      },
      order: {
        createAt: 'DESC',
      },
      skip: page * this.pageLength,
      take: this.pageLength,
    });

    return posts;
  }

  public async personalPage(id: number, frinend: boolean, page: number) {
    const posts = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.likes', 'likes')
      .where(`post.user.id = :id and ( post.public = true or :isFriend = true ) `, { id, isFriend: frinend })
      .orderBy({
        'post.createAt': 'DESC',
      })
      .skip(page * this.pageLength)
      .take(this.pageLength)
      .getManyAndCount();

    return posts;
  }

  public async findById(id: number) {
    const post = await this.findOne({
      relations: ['user', 'comments', 'likes'],
      where: {
        id,
      },
    });

    return post;
  }
}
