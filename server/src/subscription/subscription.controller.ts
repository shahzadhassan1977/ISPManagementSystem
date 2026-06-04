import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { SubscriptiondetailService } from "../subscriptiondetail/subscriptiondetail.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { CreateSubscriptiondetailDto } from "../subscriptiondetail/dto/create-subscriptiondetail.dto";
import { UpdateSubscriptiondetailDto } from "../subscriptiondetail/dto/update-subscriptiondetail.dto";
import { SubscriptionDto } from "./dto/subscription.dto";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(
    private service: SubscriptionService,
    private SubscriptiondetailService: SubscriptiondetailService,
  ) {}

  @Post()
  async create(@Body() dto: SubscriptionDto) {
    const subscriptionDto = new CreateSubscriptionDto();
    subscriptionDto.customerId = dto.customerId;
    subscriptionDto.productId = dto.productId;
    subscriptionDto.startDate = new Date(dto.startDate);
    subscriptionDto.renewalDate = new Date(dto.renewalDate);
    subscriptionDto.billingCycle = dto.billingCycle;
    subscriptionDto.status = dto.status;
    subscriptionDto.isActive = dto.isActive;
    subscriptionDto.isDeleted = dto.isDeleted;
    const result = await this.service.create(subscriptionDto);
    const subscriptiondetailDto = new CreateSubscriptiondetailDto();
    subscriptiondetailDto.installationDate = new Date(dto.installationDate);
    subscriptiondetailDto.installationCharges = dto.installationCharges;
    subscriptiondetailDto.wireCharges = dto.wireCharges;
    subscriptiondetailDto.deviceCharges = dto.deviceCharges;
    subscriptiondetailDto.splitterCharges = dto.splitterCharges;
    subscriptiondetailDto.fee = dto.fee;
    subscriptiondetailDto.otherCharges = dto.otherCharges;
    subscriptiondetailDto.paid = dto.paid;
    subscriptiondetailDto.remainingBalance = dto.remainingBalance;
    subscriptiondetailDto.deviceMac = dto.deviceMac;
    subscriptiondetailDto.userId = dto.userId;
    subscriptiondetailDto.password = dto.password;
    subscriptiondetailDto.staticIP = dto.staticIP;
    subscriptiondetailDto.olt = dto.olt;
    subscriptiondetailDto.oltPort = dto.oltPort;
    subscriptiondetailDto.splitter = dto.splitter;
    subscriptiondetailDto.splitterPort = dto.splitterPort;
    subscriptiondetailDto.subscriptionId = result.subscriptionid;
    subscriptiondetailDto.linemanId = dto.linemanId;
    subscriptiondetailDto.areaRecoveryOfficerId = dto.areaRecoveryOfficerId;
    subscriptiondetailDto.isActive = dto.isActive;
    subscriptiondetailDto.isDeleted = dto.isDeleted;
    const subscriptionDetail = await this.SubscriptiondetailService.create(
      subscriptiondetailDto,
    );
    console.log("Created subscription detail:", subscriptionDetail); // Debug log
    console.log("Subscription creation result:", result); // Debug log
    return result;
  }   

  @Get()
  async findAll() {
    const result = await this.service.findAll();

    const subscriptions = await Promise.all(
      result.map(async (subscription) => {

        const subscriptionDetails =
          await this.SubscriptiondetailService.findOne(
            subscription.subscriptionid,
          );

        return {
          ...subscription,
          subscriptiondetails: subscriptionDetails || null,
        };
      }),
    );

    //console.log("Found all subscriptions:", subscriptions);

    return subscriptions;
  }

  @Get("/:customerId")
  findAllByCustomer(@Query("customerId") customerId?: number) {
    if (customerId) return this.service.findByCustomer(+customerId);
    return this.service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const result = await this.service.findOne(+id);
    console.log("Fetched subscription:", result); // Debug log
    return result;
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() dto: SubscriptionDto) {
     const subscriptionDto = new UpdateSubscriptionDto();
    subscriptionDto.subscriptionid = id;
    subscriptionDto.customerId = dto.customerId;
    subscriptionDto.productId = dto.productId;
    subscriptionDto.startDate = new Date(dto.startDate);
    subscriptionDto.renewalDate = new Date(dto.renewalDate);
    subscriptionDto.billingCycle = dto.billingCycle;
    subscriptionDto.status = dto.status;
    subscriptionDto.isActive = dto.isActive;
    subscriptionDto.isDeleted = dto.isDeleted;
    const result = await this.service.update(+id, subscriptionDto);
    const subscriptiondetailDto = new UpdateSubscriptiondetailDto();
    subscriptiondetailDto.id = dto.id;
    subscriptiondetailDto.installationDate = new Date(dto.installationDate);
    subscriptiondetailDto.installationCharges = dto.installationCharges;
    subscriptiondetailDto.wireCharges = dto.wireCharges;
    subscriptiondetailDto.deviceCharges = dto.deviceCharges;
    subscriptiondetailDto.splitterCharges = dto.splitterCharges;
    subscriptiondetailDto.fee = dto.fee;
    subscriptiondetailDto.otherCharges = dto.otherCharges;
    subscriptiondetailDto.paid = dto.paid;
    subscriptiondetailDto.remainingBalance = dto.remainingBalance;
    subscriptiondetailDto.deviceMac = dto.deviceMac;
    subscriptiondetailDto.userId = dto.userId;
    subscriptiondetailDto.password = dto.password;
    subscriptiondetailDto.staticIP = dto.staticIP;
    subscriptiondetailDto.olt = dto.olt;
    subscriptiondetailDto.oltPort = dto.oltPort;
    subscriptiondetailDto.splitter = dto.splitter;
    subscriptiondetailDto.splitterPort = dto.splitterPort;
    subscriptiondetailDto.subscriptionId = id;
    subscriptiondetailDto.linemanId = dto.linemanId;
    subscriptiondetailDto.areaRecoveryOfficerId = dto.areaRecoveryOfficerId;
    subscriptiondetailDto.isActive = dto.isActive;
    subscriptiondetailDto.isDeleted = dto.isDeleted;
    const subscriptionDetail = await this.SubscriptiondetailService.update(
       subscriptiondetailDto.id,
       subscriptiondetailDto,
     );
    return "Update successful";
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
