import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUser1724255719683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("uuid", "email", "hashedPassword", "role", "createdAt", "updatedAt") VALUES (DEFAULT, 'test@test.fr', '$2b$10$Eb4pA54oxjK/j2NEXyTBLe8g78ue5mEmbcwKkybNNYyLL5eHhqVV.', 'ADMIN', '2024-08-21 15:58:58.821881', '2024-08-21 15:58:58.821881')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'test@test.fr'`,
    );
  }
}
