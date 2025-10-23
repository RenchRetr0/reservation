import { Injectable } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { EventModel } from '@event/domain/model';
import { PaginatedResponse } from '@common/dto';

@Injectable()
export class GetEventsUseCase {
    constructor(private readonly eventRepository: IEventRepository) {}

    async getAll(): Promise<Array<EventModel>> {
        return await this.eventRepository.findAll();
    }

    async getAllWithPaginate(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse<EventModel>> {
        return await this.eventRepository.findAllWithPagination(limit, offset);
    }
}
