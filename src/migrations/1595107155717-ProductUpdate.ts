import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductUpdate1595107155717 implements MigrationInterface {
    name = 'ProductUpdate1595107155717';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "payment" ADD "quantity" integer NOT NULL',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "payment" DROP COLUMN "quantity"');
    }
}
