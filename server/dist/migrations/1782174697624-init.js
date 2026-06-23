"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1782174697624 = void 0;
class Init1782174697624 {
    name = 'Init1782174697624';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`auth_otp\` (\`authotpId\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`isUsed\` tinyint NOT NULL, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`authotpId\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`auth_otp\``);
    }
}
exports.Init1782174697624 = Init1782174697624;
//# sourceMappingURL=1782174697624-init.js.map