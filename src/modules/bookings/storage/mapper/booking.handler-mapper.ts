import { BaseMapper } from '@common/interfaces/base-mapper';
import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entity';
import { BookingModel } from '@bookings/domain/model';
import { EventHandlerMapper } from '@event/storage/mapper';

@Injectable()
export class BookingHandlerMapper extends BaseMapper<BookingEntity, BookingModel> {
    constructor(private readonly eventHandlerMapper: EventHandlerMapper) {
        super();
    }

    toDomain(entity: BookingEntity): BookingModel {
        return new BookingModel(
            entity.id,
            entity.userId,
            entity.eventId,
            entity.event ? this.eventHandlerMapper.toDomain(entity.event) : null,
            entity.createAt,
            entity.updateAt,
            entity.deleteAt
        );
    }

    toEntity(model: BookingModel): BookingEntity {
        const entity = new BookingEntity();
        entity.id = model.getId();
        entity.userId = model.getUserId();
        entity.eventId = model.getEventId();
        return entity;
    }
}
