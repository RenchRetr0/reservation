import { BookingEntity } from '@bookings/storage/entity';
import { IRepository } from '@common/interfaces';
import { BookingModel } from '../model';
import { CreateBookingDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingHandlerMapper } from '@bookings/storage/mapper';

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
    abstract findAllByDateWithPaginate(
        startDate: Date,
        endDate: Date,
        limit: number
    ): Promise<Array<{ userId: string; totalBooking: number }>>;
}
