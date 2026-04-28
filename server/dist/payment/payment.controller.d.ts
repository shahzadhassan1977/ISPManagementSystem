import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentController {
    private service;
    constructor(service: PaymentService);
    create(dto: CreatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    findAll(customerId?: number): Promise<import("./entities/payment.entity").Payment[]>;
    findOne(id: number): Promise<import("./entities/payment.entity").Payment | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
