import { Injectable } from '@nestjs/common';
import { IEventRepository } from '@event/domain/repository';
import { GetEventUseCase } from '../get';
import { UpdateEventDto } from '@event/domain/dto';
import { BadRequest } from '@common/errors';
import { EventModel } from '@event/domain/model';

@Injectable()
export class UpdateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly getEventUseCase: GetEventUseCase
    ) {}

    async update(eventId: number, updateEventDto: UpdateEventDto): Promise<EventModel> {
        const model = await this.getEventUseCase.getByIdOrError(eventId);
        const updatedModel = this.getNewMode(model);
        try {
            if (updateEventDto.name) updatedModel.setName(updateEventDto.name);
            if (updateEventDto.totalSeats) updatedModel.setTotalSeats(updateEventDto.totalSeats);
            await this.eventRepository.verificationUpdate!(model, updatedModel);
            return updatedModel;
        } catch (error) {
            console.error('UpdateEventUseCase ~ update ~ error: ', error);
            throw new BadRequest('Cannot updated event. Try again.');
        }
    }

    private getNewMode(model: EventModel): EventModel {
        return new EventModel(
            model.getId(),
            model.getName(),
            model.getTotalSeats(),
            model.getCountBooking(),
            model.getCreateAt(),
            model.getUpdateAt(),
            model.getDeleteAt()
        );
    }
}
