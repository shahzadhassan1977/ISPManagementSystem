import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create({
      ...dto,
      customer: { customerid: dto.customerId },
      subscription: { subscriptionid: dto.subscriptionId },
    });

    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find({
      relations: ['customer', 'subscription'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['customer', 'subscription'],
    });
  }

  update(id: number, dto: UpdatePaymentDto) {
    return this.repo.update(id, {
      ...dto,
      customer: dto.customerId ? { customerid: dto.customerId } : undefined,
      subscription: dto.subscriptionId
        ? { subscriptionid: dto.subscriptionId }
        : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // 🔥 Useful APIs
  findByCustomer(customerId: number) {
    return this.repo.find({
      where: { customer: { customerid: customerId } },
    });
  }
}