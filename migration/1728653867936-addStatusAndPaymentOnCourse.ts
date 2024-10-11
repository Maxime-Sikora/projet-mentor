import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusAndPaymentOnCourse1728653867936
  implements MigrationInterface
{
  name = 'AddStatusAndPaymentOnCourse1728653867936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course_entity\` ADD \`status\` ENUM('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_entity\` ADD \`paymentIntent\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course_entity\` DROP COLUMN \`paymentIntent\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_entity\` DROP COLUMN \`status\``,
    );
  }
}
