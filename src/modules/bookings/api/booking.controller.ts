import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { CreateBookingUseCase } from '@bookings/domain/use-case/create';
import { GetBookingsUseCase, GetBookingUseCase } from '@bookings/domain/use-case/get';
import { DeleteBookingUseCase } from '@bookings/domain/use-case/delete';
import { CreateBookingDto } from '@bookings/domain/dto';
import {
    ApiBody,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BookingModel } from '@bookings/domain/model';
import { PaginatedResponse } from '@common/dto';

@ApiTags('Booking')
@Controller('api/booking')
export class BookingController {
    constructor(
        private readonly createBookingUseCase: CreateBookingUseCase,
        private readonly getBookingsUseCase: GetBookingsUseCase,
        private readonly getBookingUseCase: GetBookingUseCase,
        private readonly deleteBookingUseCase: DeleteBookingUseCase
    ) {}

    @Post('reserve')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create booking.' })
    @ApiBody({ description: 'Booking create', type: CreateBookingDto })
    @ApiResponse({ status: 201, description: 'Booking created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<void> {
        await this.createBookingUseCase.create(createBookingDto);
        return;
    }

    @Get('all/:limit/:offset')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get list booking' })
    @ApiParam({
        name: 'limit',
        type: Number,
        example: 10,
        required: true,
        description: 'The maximum number of bookings to retrieve (integer).',
    })
    @ApiParam({
        name: 'offset',
        type: Number,
        example: 0,
        required: true,
        description: 'The number of bookings to skip (integer, for pagination).',
    })
    @ApiResponse({
        status: 200,
        description: 'List of booking retrieved successfully',
        type: PaginatedResponse<BookingModel>,
    })
    async getBookings(
        @Param('limit', ParseIntPipe) limit: number,
        @Param('offset', ParseIntPipe) offset: number
    ): Promise<PaginatedResponse<BookingModel>> {
        return await this.getBookingsUseCase.getAllWithPaginate(limit, offset);
    }

    @Get('by/userId/:eventId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get booking by user ID and event ID',
        description:
            'Retrieves a specific booking based on the provided user ID (from query) and event ID (from path parameter). Returns the booking details if found.',
    })
    @ApiQuery({
        name: 'userId',
        type: String,
        required: true,
        description: 'The unique identifier of the user (string format).',
    })
    @ApiParam({
        name: 'eventId',
        type: Number,
        required: true,
        description: 'The unique identifier of the event (integer).',
    })
    @ApiResponse({
        status: 200,
        description: 'Booking successfully retrieved.',
        type: BookingModel,
    })
    @ApiNotFoundResponse({
        description: 'Booking not found for the given user ID and event ID.',
    })
    async getByBookingIdAndEventId(
        @Query('userId') userId: string,
        @Param('eventId', ParseIntPipe) eventId: number
    ): Promise<BookingModel> {
        return await this.getBookingUseCase.getByUserIdAndEventIdOrError(userId, eventId);
    }

    @Get('by/:bookingId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'bookingId', type: Number })
    @ApiResponse({ status: 200, description: 'Booking retrieved successfully', type: BookingModel })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    async getByBookingId(
        @Param('bookingId', ParseIntPipe) bookingId: number
    ): Promise<BookingModel> {
        return await this.getBookingUseCase.getByIdOrError(bookingId);
    }

    @Delete(':bookingId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async delete(@Param('bookingId', ParseIntPipe) bookingId: number): Promise<void> {
        return await this.deleteBookingUseCase.delete(bookingId);
    }
}
