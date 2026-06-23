import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Init1782174697624 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
