import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductdetailService } from './productdetail.service';
import { CreateProductdetailDto } from './dto/create-productdetail.dto';
import { UpdateProductdetailDto } from './dto/update-productdetail.dto';


@Controller('product-details')
export class ProductdetailController {
  constructor(private service: ProductdetailService) {}

  @Post()
  create(@Body() dto: CreateProductdetailDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductdetailDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }

  @Post('by-product')
  findByProduct(@Query('productId') productId: number) {
    console.log('Received productId:', productId); // Debug log
    return this.service.findByProduct(productId);
  }
}