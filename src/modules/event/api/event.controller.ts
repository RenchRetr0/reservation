import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateEventUseCase } from '@event/domain/use-case/create';
import { DeleteEventUseCase } from '@event/domain/use-case/delete';
import { GetEventsUseCase, GetEventUseCase } from '@event/domain/use-case/get';
import { UpdateEventUseCase } from '@event/domain/use-case/update';
import { CreateEventDto, UpdateEventDto } from '@event/domain/dto';
import { EventModel } from '@event/domain/model';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from '@common/dto';

@Controller('event')
@ApiTags('Event')
export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly getEventUseCase: GetEventUseCase,
        private readonly getEventsUseCase: GetEventsUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create event.' })
    @ApiBody({ description: 'Event create', type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'Event created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<void> {
        await this.createEventUseCase.create(createEventDto);
        return;
    }

    @Get(':limit/:offset')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get list event' })
    @ApiParam({
        name: 'limit',
        type: Number,
        example: 10,
        required: true,
        description: 'The maximum number of event to retrieve (integer).',
    })
    @ApiParam({
        name: 'offset',
        type: Number,
        example: 0,
        required: true,
        description: 'The number of event to skip (integer, for pagination).',
    })
    @ApiResponse({
        status: 200,
        description: 'List of events retrieved successfully',
        type: PaginatedResponse<EventModel>,
    })
    async getEvents(
        @Param('limit', ParseIntPipe) limit: number,
        @Param('offset', ParseIntPipe) offset: number
    ): Promise<PaginatedResponse<EventModel>> {
        return await this.getEventsUseCase.getAllWithPaginate(limit, offset);
    }

    @Get('by/:eventId')
    @ApiOperation({ summary: 'Get event by ID' })
    @ApiParam({ name: 'eventId', type: Number })
    @ApiResponse({ status: 200, description: 'Event retrieved successfully', type: EventModel })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async getById(@Param('eventId', ParseIntPipe) eventId: number): Promise<EventModel> {
        return await this.getEventUseCase.getByIdOrError(eventId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update event by ID' })
    @ApiBody({ description: 'Updated event data', type: UpdateEventDto })
    @ApiResponse({ status: 200, description: 'Event updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    async updateEvent(
        @Param('id', ParseIntPipe) eventId: number,
        @Body() updateEventDto: UpdateEventDto
    ): Promise<void> {
        await this.updateEventUseCase.update(eventId, updateEventDto);
        return;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async deleteEvent(@Param('id', ParseIntPipe) eventId: number): Promise<void> {
        return await this.deleteEventUseCase.delete(eventId);
    }
}
