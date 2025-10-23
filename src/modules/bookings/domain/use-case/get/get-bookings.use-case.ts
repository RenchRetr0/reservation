import { Injectable } from '@nestjs/common';
import { BookingModel } from '@bookings/domain/model';
import { IBookingRepository } from '@bookings/domain/repository';
import { PaginatedResponse } from '@common/dto';

@Injectable()
export class GetBookingsUseCase {
    constructor(private readonly bookingRepository: IBookingRepository) {}

    async getAll(): Promise<Array<BookingModel>> {
        return await this.bookingRepository.findAll();
    }

    async getAllWithPaginate(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse<BookingModel>> {
        return await this.bookingRepository.findAllWithPagination(limit, offset);
    }
}
