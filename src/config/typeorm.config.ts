import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from '@event/storage/entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: (): TypeOrmModuleOptions => {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            database: 'reservation',
            password: 'root',
            entities: [EventEntity],
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
        };
    },
};
