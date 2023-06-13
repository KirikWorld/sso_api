import { MigrationInterface, QueryRunner } from "typeorm";

export class O1686478248277 implements MigrationInterface {
    name = 'O1686478248277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_server" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(60) NOT NULL, "description" varchar(500) NOT NULL, "url" varchar(500) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client_server"`);
    }

}
