import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/core/logger/logger.service';
import { SessionDto } from './dto/req/session-request.dto';
import { SessionResponseDto } from './dto/res/session-response.dto';
import { mapToDto } from 'src/shared/utils/transformer.util';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
        private readonly logger: LoggerService,
    ) {}

    async create(dto: SessionDto): Promise<SessionResponseDto> {
        const context = `${SessionsService.name}.create`;
        const { name, startTime, endTime } = dto;

        try {
            if (startTime === endTime) {
                this.logger.warn('startTime and endTime cannot be the same', context);
                throw new BadRequestException('startTime and endTime cannot be the same');
            }

            const existingSession = await this.sessionRepository.findOne({
                where: { name },
            });

            if (existingSession) {
                throw new ConflictException(`Session with name ${name} already exists`);
            }

            const session = this.sessionRepository.create({
                name,
                startTime,
                endTime,
            });

            const result = await this.sessionRepository.save(session);

            return mapToDto(SessionResponseDto, result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;

            this.logger.error(`Error creating session: ${errorMessage}`, context, errorStack);
            throw error;
        }
    }
}
