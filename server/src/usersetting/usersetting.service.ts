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
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({});
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