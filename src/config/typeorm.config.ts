import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from '@event/storage/entity';
import { BookingEntity } from '@bookings/storage/entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: (): TypeOrmModuleOptions => {
        return {
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            database: 'reservation',
            password: 'root',
            entities: [EventEntity, BookingEntity],
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
        };
    },
};
