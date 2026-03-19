import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PairEntity } from './entities/pair.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/core/logger/logger.service';
import { PairDto } from './dto/req/pair-request.dto';
import { PairResponseDto } from './dto/res/pair-response.dto';
import { mapToDto } from 'src/shared/utils/transformer.util';

@Injectable()
export class PairService {
    constructor(
        @InjectRepository(PairEntity)
        private readonly pairRepository: Repository<PairEntity>,
        private readonly logger: LoggerService,
    ) {}

    async create(dto: PairDto): Promise<PairResponseDto> {
        const context = `${PairService.name}.create`;
        const { name, description } = dto;

        try {
            const existingPair = await this.pairRepository.findOne({
                where: { name },
            });

            if (existingPair) {
                this.logger.warn(`Pair with name ${name} already exists`, context);
                throw new ConflictException(`Pair with name ${name} already exists`);
            }

            const pair = this.pairRepository.create({ name, description });
            const result = await this.pairRepository.save(pair);
            return mapToDto(PairResponseDto, result);
        } catch (error) {
            if (error instanceof ConflictException) throw error;

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;

            this.logger.error(`Error creating pair: ${errorMessage}`, context, errorStack);
            throw error;
        }
    }
}
