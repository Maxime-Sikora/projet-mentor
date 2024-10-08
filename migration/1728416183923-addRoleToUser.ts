import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1728416183923 implements MigrationInterface {
  name = 'AddRoleToUser1728416183923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD \`role\` ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`role\``);
  }
}
