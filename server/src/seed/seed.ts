import { Permission } from "../auth/entities/permission.entity";
import { Role } from "../auth/entities/role.entity";
import { AppDataSource } from "../data-source";

async function seed() {
  const roleRepo = AppDataSource.getRepository(Role);
  const permRepo = AppDataSource.getRepository(Permission);

  const roles = ['Admin', 'Accounts', 'Sales', 'Customer'];

  const roleMap = {};

  for (const r of roles) {
    const role = await roleRepo.save({ name: r });
    roleMap[r] = role;
  }

  const permissions = [
    'USER_CREATE',
    'USER_VIEW',
    'USER_UPDATE',
    'USER_DELETE',
    'CUSTOMER_CREATE',
    'CUSTOMER_VIEW',
    'CUSTOMER_UPDATE',
    'CUSTOMER_DELETE',
    'BILLING_VIEW',
    'BILLING_CREATE',
    'PAYMENT_CREATE',
    'PAYMENT_VIEW',
  ];

  const permMap = {};

  for (const p of permissions) {
    const perm = await permRepo.save({ name: p });
    permMap[p] = perm;
  }

  console.log('✅ Seed Completed');
}