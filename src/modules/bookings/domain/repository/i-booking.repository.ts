import { BookingEntity } from '@bookings/storage/entity';
import { IRepository } from '@common/interfaces';
import { BookingModel } from '../model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingHandlerMapper } from '@bookings/storage/mapper';
import { CreateBookingDto } from '../dto';

export abstract class IBookingRepository extends IRepository<BookingEntity, BookingModel> {
    constructor(
        @InjectRepository(BookingEntity)
        protected bookingRepository: Repository<BookingEntity>,
        protected mapper: BookingHandlerMapper
    ) {
        super(bookingRepository, mapper);
    }

    abstract create(createBookingDto: CreateBookingDto): Promise<BookingModel>;
    abstract findByUserIdAndEventId(userId: string, eventId: number): Promise<BookingModel | null>;
}
