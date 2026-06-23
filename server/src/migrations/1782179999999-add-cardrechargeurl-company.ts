import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCardRechargeURLCompany1782179999999 implements MigrationInterface {
    name = 'AddCardRechargeURLCompany1782179999999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` ADD COLUMN \`CardRechargeURL\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`CardRechargeURL\``);
    }
}
