import { IEventRepository } from '@event/domain/repository';
import { Injectable } from '@nestjs/common';
import { EventModel } from '@event/domain/model';
import { BaseApiResponse } from '@common/dto/base-api-response.dto';
import { CreateEventDto } from '@event/domain/dto';

@Injectable()
export class EventRepository extends IEventRepository {
    async findById(eventId: number): Promise<EventModel | null> {
        const eventEntity = await this.repository.findOne({
            where: {
                id: eventId,
            },
            relations: { bookings: true },
        });
        return eventEntity ? this.mapper.toDomain(eventEntity) : null;
    }

    async create(createEventDto: CreateEventDto): Promise<EventModel> {
        const eventEntity = await this.repository.save(createEventDto);
        return this.mapper.toDomain(eventEntity);
    }

    async update(eventModel: EventModel): Promise<void | EventModel> {
        const eventEntity = this.mapper.toEntity(eventModel);
        await this.repository.update({ id: eventEntity.id }, eventEntity);
    }

    async delete(eventId: number): Promise<BaseApiResponse | void> {
        await this.eventRepository.softDelete({ id: eventId });
    }
}
