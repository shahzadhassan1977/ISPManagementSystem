import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productdetail } from './entities/productdetail.entity';
import { Repository } from 'typeorm';
import { CreateProductdetailDto } from './dto/create-productdetail.dto';
import { UpdateProductdetailDto } from './dto/update-productdetail.dto';

@Injectable()
export class ProductdetailService {
  constructor(
    @InjectRepository(Productdetail)
    private repo: Repository<Productdetail>,
  ) {}

  create(dto: CreateProductdetailDto) {
    const entity = this.repo.create({
      ...dto,
      product: { productid: dto.productId },
    });

    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      relations: ['product'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  update(id: number, dto: UpdateProductdetailDto) {
    return this.repo.update(id, {
      ...dto,
      product: dto.productId ? { productid: dto.productId } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // 🔥 useful filter
  findByProduct(productId: number) {
    return this.repo.find({
      where: { product: { productid: productId } },
    });
  }

   // 🔥 useful filter
  findByCompany(companyid: number) {
    return this.repo.find({
      where: {
          companyId: companyid        
      }
    });
  }
}