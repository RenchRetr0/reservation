import { Injectable } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { EventModel } from '@event/domain/model';

@Injectable()
export class GetEventsUseCase {
    constructor(private readonly eventRepository: IEventRepository) {}

    async getAll(): Promise<Array<EventModel>> {
        return await this.eventRepository.findAll();
    }
}
