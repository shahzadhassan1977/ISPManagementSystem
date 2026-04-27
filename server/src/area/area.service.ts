import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepo: Repository<Area>,
  ) {}

  // ✅ CREATE
  async create(dto: CreateAreaDto) {
    const exists = await this.areaRepo.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new BadRequestException('Area already exists');
    }

    const area = this.areaRepo.create(dto);
    return this.areaRepo.save(area);
  }

  // ✅ FIND ALL
  async findAll() {
    return this.areaRepo.find({
      relations: ['subAreas'],
      order: { areaid: 'DESC' },
    });
  }

  // ✅ FIND ONE
  async findOne(id: number) {
    const area = await this.areaRepo.findOne({
      where: { areaid: id },
      relations: ['subAreas'],
    });

    if (!area) {
      throw new NotFoundException('Area not found');
    }

    return area;
  }

  // ✅ UPDATE
  async update(id: number, dto: UpdateAreaDto) {
    const area = await this.findOne(id);

    if (dto.name && dto.name !== area.name) {
      const exists = await this.areaRepo.findOne({
        where: { name: dto.name },
      });

      if (exists) {
        throw new BadRequestException('Area name already exists');
      }
    }

    Object.assign(area, dto);

    return this.areaRepo.save(area);
  }

  // ✅ DELETE
  async remove(id: number) {
    const area = await this.findOne(id);

    await this.areaRepo.remove(area);

    return {
      message: 'Area deleted successfully',
    };
  }
}