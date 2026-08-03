import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from '../auth/entities/role.entity';
import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';

describe('RoleService', () => {
  let service: RoleService;
  let roleRepo: { create: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    roleRepo = {
      create: jest.fn((dto) => dto),
      save: jest.fn(async (role) => ({ ...role, roleid: 1 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepo,
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: { findOne: jest.fn(), findBy: jest.fn() },
        },
        {
          provide: getRepositoryToken(RolePermission),
          useValue: { delete: jest.fn(), create: jest.fn(), save: jest.fn(), findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('creates a role with safe default audit values', async () => {
    const result = await service.create({
      name: 'Admin',
    } as any);

    expect(roleRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Admin',
      isActive: true,
      isDeleted: false,
      createdBy: 0,
      updatedBy: 0,
    }));
    expect(result.roleid).toBe(1);
  });
});
