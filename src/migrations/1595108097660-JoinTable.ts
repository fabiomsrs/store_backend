import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinTable1595108097660 implements MigrationInterface {
    name = 'JoinTable1595108097660';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "payment_products_products" ("payment_id" uuid NOT NULL, 
            "products_id" uuid NOT NULL, CONSTRAINT "PK_0316e83218d1b459ed05bb39452" 
            PRIMARY KEY ("payment_id", "products_id"))`,
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_9920c34ecfb7294eb851361721" ON "payment_products_products" ("payment_id") ',
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_ea4e6239f0b83b6e11fd451350" ON "payment_products_products" ("products_id") ',
        );
        await queryRunner.query(
            `ALTER TABLE "payment_products_products" ADD CONSTRAINT "FK_9920c34ecfb7294eb8513617210" 
            FOREIGN KEY ("payment_id") 
            REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "payment_products_products" ADD CONSTRAINT "FK_ea4e6239f0b83b6e11fd4513508" 
            FOREIGN KEY ("products_id") 
            REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "payment_products_products" DROP CONSTRAINT "FK_ea4e6239f0b83b6e11fd4513508"',
        );
        await queryRunner.query(
            'ALTER TABLE "payment_products_products" DROP CONSTRAINT "FK_9920c34ecfb7294eb8513617210"',
        );
        await queryRunner.query('DROP INDEX "IDX_ea4e6239f0b83b6e11fd451350"');
        await queryRunner.query('DROP INDEX "IDX_9920c34ecfb7294eb851361721"');
        await queryRunner.query('DROP TABLE "payment_products_products"');
    }
}
