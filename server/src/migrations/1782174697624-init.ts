import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1782174697624 implements MigrationInterface {
    name = 'Init1782174697624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`auth_otp\` (\`authotpId\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`isUsed\` tinyint NOT NULL, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`authotpId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`auth_otp\``);
    }

}
