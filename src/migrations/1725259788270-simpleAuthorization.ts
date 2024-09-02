import { MigrationInterface, QueryRunner } from "typeorm";

export class SimpleAuthorization1725259788270 implements MigrationInterface {
    name = 'SimpleAuthorization1725259788270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a07c1965ebfd4f5bf4473db3aad"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "REL_a07c1965ebfd4f5bf4473db3aa"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "resourceUuid"`);
        await queryRunner.query(`ALTER TABLE "connection" ALTER COLUMN "expirationDate" SET DEFAULT NOW() + interval '1 year'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" ALTER COLUMN "expirationDate" SET DEFAULT (now() + '1 year')`);
        await queryRunner.query(`ALTER TABLE "article" ADD "resourceUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "REL_a07c1965ebfd4f5bf4473db3aa" UNIQUE ("resourceUuid")`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a07c1965ebfd4f5bf4473db3aad" FOREIGN KEY ("resourceUuid") REFERENCES "resource"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
