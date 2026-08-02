import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usersetting } from './entities/usersetting.entity';

@Injectable()
export class UsersettingService {
  constructor(
    @InjectRepository(Usersetting)
    private repo: Repository<Usersetting>,
  ) {}

  create(dto: any) {
    const entity = this.repo.create({
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      order: {
        id: 'DESC',
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id }
    });
  }

  update(id: number, dto: any) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}