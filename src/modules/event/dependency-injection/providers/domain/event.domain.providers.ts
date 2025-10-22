import { Provider } from '@nestjs/common';
import { CreateEventUseCase } from '@event/domain/use-case/create';
import { GetEventsUseCase, GetEventUseCase } from '@event/domain/use-case/get';
import { UpdateEventUseCase } from '@event/domain/use-case/update';
import { DeleteEventUseCase } from '@event/domain/use-case/delete';

export const EventDomainProviders: Array<Provider> = [
    CreateEventUseCase,
    GetEventUseCase,
    GetEventsUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
];
