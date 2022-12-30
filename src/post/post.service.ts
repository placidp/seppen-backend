import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(8);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
    };
  }

  async findOne(id: number) {
    const found = await this.repository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Статья не найдена');
    }

    return found;
  }

  async update(id: number, dto: UpdatePostDto) {
    const found = await this.repository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const found = await this.repository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Статья не найдена');
    }
    return this.repository.delete(id);
  }
}
