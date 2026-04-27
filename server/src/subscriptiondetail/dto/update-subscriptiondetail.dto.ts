import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptiondetailDto } from './create-subscriptiondetail.dto';

export class UpdateSubscriptiondetailDto extends PartialType(CreateSubscriptiondetailDto) {}