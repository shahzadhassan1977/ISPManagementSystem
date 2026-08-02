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

  async create(dto: CreatePaymentDto) {
    const payment = this.repo.create({
      ...dto,
      customer: { customerid: dto.customerId },
      subscription: { subscriptionid: dto.subscriptionId },
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : new Date(),
      createdBy: dto.createdBy ?? 0,
      updatedBy: dto.updatedBy ?? 0,
      paymentMethod: dto.paymentMethod ?? dto.paymentMethod ?? 'Cash',
    });

    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find({
      relations: [
        'customer',
        'subscription', 
        'subscription.product',
        'subscription.subscriptiondetails',
      ],
      order: {
        id: 'DESC',
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: [
        'customer', 
        'subscription',
        'subscription.product',
        'subscription.subscriptiondetails',
      ],
    });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    return this.repo.update(id, {
      ...dto,
      customer: dto.customerId ? { customerid: dto.customerId } : undefined,
      subscription: dto.subscriptionId
        ? { subscriptionid: dto.subscriptionId }
        : undefined,
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : new Date(),
      updatedBy: dto.updatedBy ?? 0,
      paymentMethod: dto.paymentMethod ?? dto.paymentMethod ?? 'Cash',
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // 🔥 Useful APIs
  findByCustomer(customerId: number) {
    return this.repo.find({
      relations: [
        'customer',
        'subscription',
        'subscription.product',
        'subscription.subscriptiondetails',
      ],
      where: { customer: { customerid: customerId } },
    });
  }
}