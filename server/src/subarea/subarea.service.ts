import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subarea } from './entities/subarea.entity';
import { Area } from '../area/entities/area.entity';
import { CreateSubareaDto } from './dto/create-subarea.dto';

@Injectable()
export class SubareaService {
  constructor(
    @InjectRepository(Subarea)
    private subareaRepo: Repository<Subarea>,
    @InjectRepository(Area)
    private areaRepo: Repository<Area>,
    
  ) {}

 async create(createSubareaDto: CreateSubareaDto) {
           
         const subarea=this.subareaRepo.create({
             name: createSubareaDto.name,
             area: { areaid: createSubareaDto.areaId } as Area,
             isActive: createSubareaDto.isActive ?? true,
             isDeleted: createSubareaDto.isDeleted ?? false,
           });
       
           return this.subareaRepo.save(subarea);
     }

 async findAll() {
          return this.subareaRepo.find({
            select: {
              subareaid: true,
              name: true,
              areaId: true,
            },
            relations: ['area'],
          });
        }
      
    async findOne(id: number) {
          const subareaid = id ?? 0;
          const subarea = await this.subareaRepo.findOne({
            where: { subareaid },
            relations: ['area'],
          });
      
          if (!subarea) {
            throw new NotFoundException('Subarea not found');
          }
      
          return subarea;
    }      
   
 
  findByArea(areaId: number) {
    return this.subareaRepo.find({
        where: { area: { areaid: areaId } },
    });
  }

  async  update(id: number, dto: any) {

    const subArea = await this.findOne(id);
    if (!subArea) {
      throw new Error('Subarea not found');
    }

    let changed = false;

    if (dto.name && subArea.name !== dto.name) {
      subArea.name = dto.name;
      changed = true;
    }

    if (dto.areaId && subArea.area.areaid !== dto.areaId) {
      subArea.area = { areaid: dto.areaId } as Area;
      changed = true;
    }

    if (dto.isActive !== undefined && subArea.isActive !== dto.isActive) {
      subArea.isActive = dto.isActive;
      changed = true;
    }

    if (dto.isDeleted !== undefined && subArea.isDeleted !== dto.isDeleted) {
      subArea.isDeleted = dto.isDeleted;
      changed = true;
    }

    if (!changed) {
      return subArea;
    }

    return this.subareaRepo.save(subArea);
  }

  // ✅ DELETE USER
    async remove(id: number) {
      
          const subarea = await this.findOne(id);
      
          await this.subareaRepo.remove(subarea!);
      
          return {
            message: 'Subarea deleted successfully',
          };
    }
}