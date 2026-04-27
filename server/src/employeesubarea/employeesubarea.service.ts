import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSubarea } from './entities/employeesubarea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeSubareaService {
  constructor(
    @InjectRepository(EmployeeSubarea)
    private repo: Repository<EmployeeSubarea>,
  ) {}

  async create(dto: any) {
    // prevent duplicate manually (extra safety)
    const exists = await this.repo.findOne({
      where: {
        employee: { employeeid: dto.employeeId },
        subarea: { subareaid: dto.subareaId },
      },
    });

    if (exists) {
      throw new BadRequestException('Mapping already exists');
    }

    const entity = this.repo.create({
      employee: { employeeid: dto.employeeId },
      subarea: { subareaid: dto.subareaId },
    });

    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      relations: ['employee', 'subarea'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['employee', 'subarea'],
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  // 🔥 Useful APIs
  findByEmployee(employeeId: number) {
    return this.repo.find({
      where: { employee: { employeeid: employeeId } },
      relations: ['subarea'],
    });
  }

  findBySubArea(subareaId: number) {
    return this.repo.find({
      where: { subarea: { subareaid: subareaId } },
      relations: ['employee'],
    });
  }
}