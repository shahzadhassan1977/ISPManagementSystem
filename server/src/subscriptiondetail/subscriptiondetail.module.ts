import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriptiondetail } from './entities/subscriptiondetail.entity';
import { SubscriptiondetailService } from './subscriptiondetail.service';
import { SubscriptiondetailController } from './subscriptiondetail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriptiondetail])
  ],
  providers: [
    SubscriptiondetailService
  ],
  controllers: [
    SubscriptiondetailController
  ],
  exports: [
    SubscriptiondetailService,
    TypeOrmModule
  ]
})
export class SubscriptiondetailModule {}