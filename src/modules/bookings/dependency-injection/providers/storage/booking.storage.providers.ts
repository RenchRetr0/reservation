import { Provider } from '@nestjs/common';
import { IBookingRepository } from '@bookings/domain/repository';
import { BookingRepository } from '@bookings/storage/repository';
import { BookingHandlerMapper } from '@bookings/storage/mapper';

export const BookingStorageProviders: Array<Provider> = [
    {
        provide: IBookingRepository,
        useClass: BookingRepository,
    },
    BookingHandlerMapper,
];
