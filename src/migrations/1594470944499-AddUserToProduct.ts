import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToProduct1594470944499 implements MigrationInterface {
    name = 'AddUserToProduct1594470944499';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "products" ADD "user_id" uuid');
        await queryRunner.query(
            `ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" 
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"',
        );
        await queryRunner.query('ALTER TABLE "products" DROP COLUMN "user_id"');
    }
}
