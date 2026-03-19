import { Controller } from '@nestjs/common';
import { PairService } from './pair.service';

@Controller('pair')
export class PairController {
    constructor(private readonly pairService: PairService) {}
}
