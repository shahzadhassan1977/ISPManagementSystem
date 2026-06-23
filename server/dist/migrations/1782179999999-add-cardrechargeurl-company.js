"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCardRechargeURLCompany1782179999999 = void 0;
class AddCardRechargeURLCompany1782179999999 {
    name = 'AddCardRechargeURLCompany1782179999999';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`company\` ADD COLUMN \`CardRechargeURL\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`CardRechargeURL\``);
    }
}
exports.AddCardRechargeURLCompany1782179999999 = AddCardRechargeURLCompany1782179999999;
//# sourceMappingURL=1782179999999-add-cardrechargeurl-company.js.map