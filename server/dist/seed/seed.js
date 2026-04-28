"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission_entity_1 = require("../auth/entities/permission.entity");
const role_entity_1 = require("../auth/entities/role.entity");
const data_source_1 = require("../data-source");
async function seed() {
    const roleRepo = data_source_1.AppDataSource.getRepository(role_entity_1.Role);
    const permRepo = data_source_1.AppDataSource.getRepository(permission_entity_1.Permission);
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
//# sourceMappingURL=seed.js.map