import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './storage/entity';
import { EventModule } from '@event/event.module';
import { BookingStorageProviders } from './dependency-injection/providers/storage';
import { BookingDomainProviders } from './dependency-injection/providers/domain';
import { BookingController } from './api';

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity]), EventModule],
    controllers: [BookingController],
    providers: [...BookingDomainProviders, ...BookingStorageProviders],
    exports: [],
})
export class BookingsModule {}
