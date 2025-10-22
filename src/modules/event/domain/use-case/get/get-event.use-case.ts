import { Injectable } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { EventModel } from '@event/domain/model';
import { NotFound } from '@common/errors';

@Injectable()
export class GetEventUseCase {
    constructor(private readonly eventRepository: IEventRepository) {}

    async getByIdOrNull(eventId: number): Promise<EventModel | null> {
        return await this.eventRepository.findById!(eventId);
    }

    async getByIdOrError(eventId: number): Promise<EventModel> {
        const model = await this.getByIdOrNull(eventId);
        if (model) return model;
        throw new NotFound('Event not found');
    }
}
