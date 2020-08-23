import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateAppointments1593910417927 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          { name: 'provider', type: 'varchar' },
          { name: 'date', type: 'timestamp with time zone' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }

        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }

}

/**
 * Linha do Tempo:
 *
 *  - 1ª semana: criar Agendamentos;
 *  - 2ª semana: Usuários
 *  - 3ª semana: (NOVO DEV) Edição em Agendamentos
 *  - 4ª semana: Compras
 *
 * Controle de versão (tipo Git...)
 */
