import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscriptiondetail } from '../subscriptiondetail/entities/subscriptiondetail.entity';
import { SubscriptiondetailService } from '../subscriptiondetail/subscriptiondetail.service';
import { SubscriptiondetailController } from '../subscriptiondetail/subscriptiondetail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Subscriptiondetail])
  ],
  providers: [
    SubscriptionService,
    SubscriptiondetailService
  ],
  controllers: [
    SubscriptionController,
    SubscriptiondetailController
  ],
  exports: [
    SubscriptionService,
    SubscriptiondetailService,
    TypeOrmModule
  ],
})
export class SubscriptionModule {}