import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productdetail } from './entities/productdetail.entity';
import { ProductdetailService } from './productdetail.service';
import { ProductdetailController } from './productdetail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productdetail])
  ],
  providers: [
    ProductdetailService
  ],
  controllers: [
    ProductdetailController
  ],
  exports: [
    ProductdetailService,
    TypeOrmModule
  ]
})
export class ProductdetailModule {}