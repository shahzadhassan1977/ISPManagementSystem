"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1776070716208 = void 0;
class Init1776070716208 {
    name = 'Init1776070716208';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`usersetting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`keyName\` varchar(255) NOT NULL, \`keyValue\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_eb7296058ed59c58a39675e9c1\` (\`keyName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`portalsetting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`keyName\` varchar(255) NOT NULL, \`keyValue\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9f145df485a183ba4016b882e7\` (\`keyName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_9f145df485a183ba4016b882e7\` ON \`portalsetting\``);
        await queryRunner.query(`DROP TABLE \`portalsetting\``);
        await queryRunner.query(`DROP INDEX \`IDX_eb7296058ed59c58a39675e9c1\` ON \`usersetting\``);
        await queryRunner.query(`DROP TABLE \`usersetting\``);
    }
}
exports.Init1776070716208 = Init1776070716208;
//# sourceMappingURL=1776070716208-init.js.map