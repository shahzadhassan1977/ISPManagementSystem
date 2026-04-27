import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portalsetting } from './entities/portalsetting.entity';

@Injectable()
export class PortalsettingService {
  constructor(
    @InjectRepository(Portalsetting)
    private repo: Repository<Portalsetting>,
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