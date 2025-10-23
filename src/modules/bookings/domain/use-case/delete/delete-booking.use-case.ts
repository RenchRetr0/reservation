import { Injectable } from '@nestjs/common';
import { IBookingRepository } from '@bookings/domain/repository';
import { BadRequest } from '@common/errors';

@Injectable()
export class DeleteBookingUseCase {
    constructor(private readonly bookingRepository: IBookingRepository) {}

    async delete(bookingId: number): Promise<void> {
        try {
            await this.bookingRepository.delete!(bookingId);
        } catch (error) {
            console.error('DeleteBookingUseCase ~ delete ~ error: ', error);
            throw new BadRequest('Cannot deleted booking. Try again.');
        }
    }
}
