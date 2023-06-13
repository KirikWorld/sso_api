import { MigrationInterface, QueryRunner } from "typeorm";

export class O1686471078423 implements MigrationInterface {
    name = 'O1686471078423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(60) NOT NULL, "description" varchar(500) NOT NULL, CONSTRAINT "UQ_4a74ca47fe1aa34a28a6db3c722" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "UID" varchar(37) NOT NULL, "firstName" varchar(60) NOT NULL, "lastName" varchar(60) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_a33fc3c1a4ab1182bb4364a8aa4" UNIQUE ("UID"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "log" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" integer NOT NULL, "title" varchar(60) NOT NULL, "description" varchar(500) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_role_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26736dfb41d6a47ce5d8365aad" ON "user_role_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8188039e9fdf7572245e2ed8a8" ON "user_role_role" ("roleId") `);
        await queryRunner.query(`DROP INDEX "IDX_26736dfb41d6a47ce5d8365aad"`);
        await queryRunner.query(`DROP INDEX "IDX_8188039e9fdf7572245e2ed8a8"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_role_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "FK_26736dfb41d6a47ce5d8365aad7" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_8188039e9fdf7572245e2ed8a83" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_role_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_role_role"`);
        await queryRunner.query(`DROP TABLE "user_role_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_role_role" RENAME TO "user_role_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_26736dfb41d6a47ce5d8365aad" ON "user_role_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8188039e9fdf7572245e2ed8a8" ON "user_role_role" ("roleId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_8188039e9fdf7572245e2ed8a8"`);
        await queryRunner.query(`DROP INDEX "IDX_26736dfb41d6a47ce5d8365aad"`);
        await queryRunner.query(`ALTER TABLE "user_role_role" RENAME TO "temporary_user_role_role"`);
        await queryRunner.query(`CREATE TABLE "user_role_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`INSERT INTO "user_role_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_role_role"`);
        await queryRunner.query(`DROP TABLE "temporary_user_role_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_8188039e9fdf7572245e2ed8a8" ON "user_role_role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_26736dfb41d6a47ce5d8365aad" ON "user_role_role" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_8188039e9fdf7572245e2ed8a8"`);
        await queryRunner.query(`DROP INDEX "IDX_26736dfb41d6a47ce5d8365aad"`);
        await queryRunner.query(`DROP TABLE "user_role_role"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
