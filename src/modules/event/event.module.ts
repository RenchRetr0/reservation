import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './storage/entity';
import { EventRepositoryProvider } from './dependency-injection/providers/storage';
import { EventDomainProviders } from './dependency-injection/providers/domain';
import { EventHandlerMapper } from './storage/mapper';
import { EventController } from './api';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventController],
    providers: [...EventDomainProviders, EventHandlerMapper, EventRepositoryProvider],
    exports: [],
})
export class EventModule {}
