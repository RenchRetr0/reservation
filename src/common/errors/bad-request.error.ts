import { HttpException } from '@nestjs/common';
import { HttpStatusCode, HttpStatusMessage } from '@common/enums';

export class BadRequest extends HttpException {
    constructor(message: string | void) {
        super(
            { message: message ?? HttpStatusMessage[HttpStatusCode.BAD_REQUEST] },
            HttpStatusCode.BAD_REQUEST
        );
    }
}
