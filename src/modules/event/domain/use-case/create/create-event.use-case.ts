import { BadRequest } from '@common/errors';
import { CreateEventDto } from '@event/domain/dto';
import { EventModel } from '@event/domain/model';
import { IEventRepository } from '@event/domain/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateEventUseCase {
    constructor(private readonly eventRepository: IEventRepository) {}

    async create(createEventDto: CreateEventDto): Promise<EventModel> {
        try {
            return await this.eventRepository.create(createEventDto);
        } catch (error) {
            console.error('CreateEventUseCase ~ create ~ error: ', error);
            throw new BadRequest('Cannot create event. Try again.');
        }
    }
}
