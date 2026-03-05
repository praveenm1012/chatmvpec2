import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageTable20260305154701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          
          {
            name: 'chatId',
            type: 'varchar',
            isNullable: false,
            
          },
          
          {
            name: 'senderId',
            type: 'varchar',
            isNullable: false,
            
          },
          
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
            
          },
          
          {
            name: 'createdAt',
            type: 'varchar',
            isNullable: false,
            
          },
          
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}