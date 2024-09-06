import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1725608180559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("uuid", "email", "firstname", "name", "hashedPassword", "role", "createdAt", "updatedAt") VALUES (DEFAULT, 'root@4app.fr', 'root', 'root', '$2b$10$Eb4pA54oxjK/j2NEXyTBLe8g78ue5mEmbcwKkybNNYyLL5eHhqVV.', 'ROOT', '2024-08-21 15:58:57.821881', '2024-08-21 15:58:57.821881')`,
    );
    await queryRunner.query(
      `INSERT INTO "user" ("uuid", "email", "firstname", "name", "hashedPassword", "role", "createdAt", "updatedAt") VALUES (DEFAULT, 'admin@4app.fr', 'admin', 'admin', '$2b$10$Eb4pA54oxjK/j2NEXyTBLe8g78ue5mEmbcwKkybNNYyLL5eHhqVV.', 'ADMIN', '2024-08-21 15:58:58.821881', '2024-08-21 15:58:58.821881')`,
    );
    await queryRunner.query(
      `INSERT INTO "user" ("uuid", "email", "firstname", "name", "hashedPassword", "role", "createdAt", "updatedAt") VALUES (DEFAULT, 'user@4app.fr', 'user', 'user', '$2b$10$Eb4pA54oxjK/j2NEXyTBLe8g78ue5mEmbcwKkybNNYyLL5eHhqVV.', 'USER', '2024-08-21 15:58:59.821881', '2024-08-21 15:58:59.821881')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'root@4app.fr'`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'admin@4app.fr'`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'user@4app.fr'`,
    );
  }
}
