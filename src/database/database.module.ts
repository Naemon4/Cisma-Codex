import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        // Cada módulo de feature registra seu próprio model via SequelizeModule.forFeature().
        // O DatabaseModule não precisa conhecer nenhuma entidade — fica isolado, só cuida da conexão.
        autoLoadModels: true,

        // Cria/atualiza tabelas automaticamente com base nos models. Bom em dev, proibido em produção
        // (lá o certo é usar migrations).
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}