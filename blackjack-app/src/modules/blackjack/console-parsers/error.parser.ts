import { Injectable } from '@nestjs/common';
import { DrawCardResultDto } from '../dtos/draw-card-result.dto';

@Injectable()
export class ErrorParser {
    constructor() { }

    async parser(response: any) {
        console.log(response.message);
    }
}
