import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeQuantity1595204566366 implements MigrationInterface {
    name = 'ChangeQuantity1595204566366';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "products" DROP CONSTRAINT "CHK_fa21870c375fdfd093db6371ec"',
        );
        await queryRunner.query(
            'ALTER TABLE "products" ADD CONSTRAINT "CHK_06ca19f9a636e219497805ff60" CHECK (quantity>=0)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "products" DROP CONSTRAINT "CHK_06ca19f9a636e219497805ff60"',
        );
        await queryRunner.query(
            'ALTER TABLE "products" ADD CONSTRAINT "CHK_fa21870c375fdfd093db6371ec" CHECK ((quantity > 0))',
        );
    }
}
