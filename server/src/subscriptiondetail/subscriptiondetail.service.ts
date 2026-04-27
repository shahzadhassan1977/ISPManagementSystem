import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriptiondetail } from './entities/subscriptiondetail.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptiondetailDto } from './dto/create-subscriptiondetail.dto';
import { UpdateSubscriptiondetailDto } from './dto/update-subscriptiondetail.dto';

@Injectable()
export class SubscriptiondetailService {
  constructor(
    @InjectRepository(Subscriptiondetail)
    private repo: Repository<Subscriptiondetail>,
  ) {}

  create(dto: CreateSubscriptiondetailDto) {
    const entity = this.repo.create({
      ...dto,
      subscription: { subscriptionid: dto.subscriptionId },
    });

    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      relations: ['subscription'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['subscription'],
    });
  }

  update(id: number, dto: UpdateSubscriptiondetailDto) {
    return this.repo.update(id, {
      ...dto,
      subscription: dto.subscriptionId
        ? { subscriptionid: dto.subscriptionId }
        : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}