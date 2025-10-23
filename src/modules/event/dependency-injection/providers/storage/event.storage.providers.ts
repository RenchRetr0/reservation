import { Provider } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { EventRepository } from '@event/storage/repository';
import { EventHandlerMapper } from '@event/storage/mapper';

export const EventStorageProviders: Array<Provider> = [
    {
        provide: IEventRepository,
        useClass: EventRepository,
    },
    EventHandlerMapper,
];
