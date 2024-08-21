import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1724251703120 implements MigrationInterface {
    name = 'InitDB1724251703120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connection" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL DEFAULT NOW() + interval '1 year', "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "userUuid" uuid, CONSTRAINT "PK_77559e358d2111425be5344587d" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_393a07f6ade7de4dc20fdf00008" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."permission_action_enum" AS ENUM('READ', 'WRITE', 'EDIT', 'DELETE', 'PUBLISH')`);
        await queryRunner.query(`CREATE TYPE "public"."permission_role_enum" AS ENUM('ROOT', 'ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR', 'USER')`);
        await queryRunner.query(`CREATE TABLE "permission" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" "public"."permission_action_enum" NOT NULL DEFAULT 'READ', "conditions" json, "role" "public"."permission_role_enum" NOT NULL DEFAULT 'USER', "userUuid" uuid, "resourceUuid" uuid, CONSTRAINT "PK_972bbdc048bf5d859b99488607e" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ROOT', 'ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "article" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userUuid" uuid, "resourceUuid" uuid, CONSTRAINT "REL_a07c1965ebfd4f5bf4473db3aa" UNIQUE ("resourceUuid"), CONSTRAINT "PK_36cdcdc76a24270d4ab6fb7986b" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_46472729787674ce455b0e39060" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_5ae731de4e4d46ff7cc62ce8db8" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_5979a1419f63360208ce4b9597f" FOREIGN KEY ("resourceUuid") REFERENCES "resource"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_d6418c7438d3b6f7c00d6db1ede" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a07c1965ebfd4f5bf4473db3aad" FOREIGN KEY ("resourceUuid") REFERENCES "resource"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a07c1965ebfd4f5bf4473db3aad"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_d6418c7438d3b6f7c00d6db1ede"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_5979a1419f63360208ce4b9597f"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_5ae731de4e4d46ff7cc62ce8db8"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_46472729787674ce455b0e39060"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "connection"`);
    }

}
