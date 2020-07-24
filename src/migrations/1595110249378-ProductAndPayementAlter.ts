import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAndPayementAlter1595110249378
    implements MigrationInterface {
    name = 'ProductAndPayementAlter1595110249378';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "payment" DROP COLUMN "quantity"');
        await queryRunner.query(
            'ALTER TABLE "products" ADD "quantity" integer NOT NULL DEFAULT 1',
        );
        await queryRunner.query(
            'ALTER TABLE "products" ADD CONSTRAINT "CHK_fa21870c375fdfd093db6371ec" CHECK (quantity>0)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "products" DROP CONSTRAINT "CHK_fa21870c375fdfd093db6371ec"',
        );
        await queryRunner.query(
            'ALTER TABLE "products" DROP COLUMN "quantity"',
        );
        await queryRunner.query(
            'ALTER TABLE "payment" ADD "quantity" integer NOT NULL',
        );
    }
}
