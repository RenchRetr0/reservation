import { IEventRepository } from '@event/domain/repository';
import { EventRepository } from '@event/storage/repository';
import { Provider } from '@nestjs/common';

export const EventRepositoryProvider: Provider = {
    provide: IEventRepository,
    useClass: EventRepository,
};
