import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1691692324249 implements MigrationInterface {
  name = 'initTables1691692324249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit"."audit-trail" ("id" uuid NOT NULL, "entity" text, "action" text, "new_value" jsonb, "modified_at" timestamp NOT NULL, CONSTRAINT PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bank"."account" ("id" uuid NOT NULL, "given_name" text NOT NULL, "family_name" text NOT NULL, "email_address" text NOT NULL, "note" text, "balance" jsonb, CONSTRAINT PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bank"."transaction" ("id" uuid NOT NULL, "note" text, "amount_money" jsonb, "account_id" uuid NOT NULL, "target_account_id" uuid, CONSTRAINT PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bank"."transaction" ADD CONSTRAINT "FK_4ff861a695f38bbf36009655c54" FOREIGN KEY ("account_id") REFERENCES "bank"."account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bank"."transaction" ADD CONSTRAINT "FK_70551479a1f7b93c8b832321542" FOREIGN KEY ("target_account_id") REFERENCES "bank"."account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bank"."transaction" DROP CONSTRAINT "FK_4ff861a695f38bbf36009655c54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bank"."transaction" DROP CONSTRAINT "FK_70551479a1f7b93c8b832321542"`,
    );
    await queryRunner.query(`DROP TABLE "bank"."transactions"`);
    await queryRunner.query(`DROP TABLE "bank"."account"`);
    await queryRunner.query(`DROP TABLE "audit"."audit-trail"`);
  }
}
