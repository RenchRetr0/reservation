import { Injectable } from '@nestjs/common';
import { IBookingRepository } from '@bookings/domain/repository';
import { GetEventUseCase } from '@event/domain/use-case/get';
import { BookingModel } from '@bookings/domain/model';
import { BadRequest } from '@common/errors';
import { CreateBookingDto } from '@bookings/domain/dto';
import { GetBookingUseCase } from '../get';

@Injectable()
export class CreateBookingUseCase {
    constructor(
        private readonly bookingRepository: IBookingRepository,
        private readonly getEventUseCase: GetEventUseCase,
        private readonly getBookingUseCase: GetBookingUseCase
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<BookingModel> {
        const { eventId, userId } = createBookingDto;
        const existEventModel = await this.getEventUseCase.getByIdOrError(eventId);
        const countBooking = existEventModel.getCountBooking();

        if (countBooking !== null && countBooking >= existEventModel.getTotalSeats())
            throw new BadRequest('Event is fully booked or invalid count.');
        try {
            const existBookingModel = await this.getBookingUseCase.getByUserIdAndEventIdOrNull(
                userId,
                existEventModel.getId()
            );
            if (existBookingModel) return existBookingModel;
            return await this.bookingRepository.create({
                userId,
                eventId: existEventModel.getId(),
            });
        } catch (error) {
            console.error('CreateBookingUseCase ~ create ~ error: ', error);
            throw new BadRequest('Cannot created booking. Try again.');
        }
    }
}
