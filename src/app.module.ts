import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), EventModule, BookingsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
