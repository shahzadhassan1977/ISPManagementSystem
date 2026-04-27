import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private repo: Repository<Subscription>,
  ) {}

  create(dto: CreateSubscriptionDto) {
    const entity = this.repo.create({
      ...dto,
      customer: { customerid: dto.customerId },
      product: { productid: dto.productId },
    });

    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      relations: ['customer', 'product'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { subscriptionid:id },
      relations: ['customer', 'product', 'subscriptiondetails'],
    });
  }

  update(id: number, dto: UpdateSubscriptionDto) {
    return this.repo.update(id, {
      ...dto,
      customer: dto.customerId ? { customerid: dto.customerId } : undefined,
      product: dto.productId ? { productid: dto.productId } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // 🔥 useful filters
  findByCustomer(customerId: number) {
    return this.repo.find({
      where: { customer: { customerid: customerId } },
    });
  }
}