import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1728303023718 implements MigrationInterface {
  name = 'FirstMigration1728303023718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`level_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`subject_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`announce_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`subjectId\` int NULL, \`levelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce_entity\` ADD CONSTRAINT \`FK_2118f2c1988da41bcf77c75f3b2\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce_entity\` ADD CONSTRAINT \`FK_225f58c89ce5156ea2d30e0e4a8\` FOREIGN KEY (\`levelId\`) REFERENCES \`level_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`announce_entity\` DROP FOREIGN KEY \`FK_225f58c89ce5156ea2d30e0e4a8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce_entity\` DROP FOREIGN KEY \`FK_2118f2c1988da41bcf77c75f3b2\``,
    );
    await queryRunner.query(`DROP TABLE \`user_entity\``);
    await queryRunner.query(`DROP TABLE \`announce_entity\``);
    await queryRunner.query(`DROP TABLE \`subject_entity\``);
    await queryRunner.query(`DROP TABLE \`level_entity\``);
  }
}
