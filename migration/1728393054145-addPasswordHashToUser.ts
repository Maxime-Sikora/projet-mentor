import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordHashToUser1728393054145 implements MigrationInterface {
  name = 'AddPasswordHashToUser1728393054145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD \`passwordHash\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` DROP COLUMN \`passwordHash\``,
    );
  }
}
