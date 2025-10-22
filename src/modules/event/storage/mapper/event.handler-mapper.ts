import { BaseMapper } from '@common/interfaces/base-mapper';
import { Injectable } from '@nestjs/common';
import { EventEntity } from '../entity';
import { EventModel } from '@event/domain/model';

@Injectable()
export class EventHandlerMapper extends BaseMapper<EventEntity, EventModel> {
    toDomain(entity: EventEntity): EventModel {
        return new EventModel(
            entity.id,
            entity.name,
            entity.totalSeats,
            entity.createAt,
            entity.updateAt,
            entity.deleteAt
        );
    }

    toEntity(model: EventModel): EventEntity {
        const entity = new EventEntity();
        entity.id = model.getId();
        entity.name = model.getName();
        entity.totalSeats = model.getTotalSeats();
        return entity;
    }
}
