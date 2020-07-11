import { MigrationInterface, QueryRunner } from 'typeorm';

export class Payment1594447984612 implements MigrationInterface {
    name = 'payment1594447984612';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "amount" integer NOT NULL, "installments" integer NOT NULL, "status" integer NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "user_id" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "payment" ADD CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b" 
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "payment" DROP CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b"',
        );
        await queryRunner.query('DROP TABLE "payment"');
    }
}
