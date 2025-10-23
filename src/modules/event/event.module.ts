import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './storage/entity';
import { EventStorageProviders } from './dependency-injection/providers/storage';
import { EventDomainProviders } from './dependency-injection/providers/domain';
import { EventController } from './api';
import { ExportsEventProviders } from './dependency-injection/exports';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventController],
    providers: [...EventDomainProviders, ...EventStorageProviders],
    exports: [...ExportsEventProviders],
})
export class EventModule {}
