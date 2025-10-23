import { Provider } from '@nestjs/common';
import { GetEventUseCase } from '@event/domain/use-case/get';
import { EventHandlerMapper } from '@event/storage/mapper';

export const ExportsEventProviders: Array<Provider> = [GetEventUseCase, EventHandlerMapper];
