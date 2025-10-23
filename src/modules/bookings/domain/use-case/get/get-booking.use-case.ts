import { BookingModel } from '@bookings/domain/model';
import { IBookingRepository } from '@bookings/domain/repository';
import { NotFound } from '@common/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBookingUseCase {
    constructor(private readonly bookingRepository: IBookingRepository) {}

    async getByIdOrNull(bookingId: number): Promise<BookingModel | null> {
        return await this.bookingRepository.findById!(bookingId);
    }

    async getByIdOrError(bookingId: number): Promise<BookingModel> {
        const model = await this.getByIdOrNull(bookingId);
        if (model) return model;
        throw new NotFound('Booking not found. Try again.');
    }

    async getByUserIdAndEventIdOrNull(
        userId: string,
        eventId: number
    ): Promise<BookingModel | null> {
        return await this.bookingRepository.findByUserIdAndEventId(userId, eventId);
    }

    async getByUserIdAndEventIdOrError(userId: string, eventId: number): Promise<BookingModel> {
        const model = await this.getByUserIdAndEventIdOrNull(userId, eventId);
        if (model) return model;
        throw new NotFound('Booking not found. Try again.');
    }
}
