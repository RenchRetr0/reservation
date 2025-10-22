import { IRepository } from '@common/interfaces';
import { EventEntity } from '@event/storage/entity';
import { EventModel } from '../model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventHandlerMapper } from '@event/storage/mapper';
import { CreateEventDto } from '../dto';

export abstract class IEventRepository extends IRepository<EventEntity, EventModel> {
    constructor(
        @InjectRepository(EventEntity)
        protected eventRepository: Repository<EventEntity>,
        protected mapper: EventHandlerMapper
    ) {
        super(eventRepository, mapper);
    }

    abstract create(createEventDto: CreateEventDto): Promise<EventModel>;
}
