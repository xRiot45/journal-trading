import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateJournalRequestDto } from './dto/req/journal-request.dto';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { JournalResponseDto } from './dto/res/journal-response.dto';
import { ApiDocGenericResponse } from 'src/common/decorators/api-doc.decorator';

@ApiTags('Journals')
@UseGuards(JwtAuthGuard)
@Controller('journals')
export class JournalsController {
    constructor(private readonly journalsService: JournalsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiDocGenericResponse({
        summary: 'Create Journal',
        description: 'Create Journal',
        auth: true,
        body: CreateJournalRequestDto,
        response: JournalResponseDto,
        status: HttpStatus.CREATED,
        consumes: 'application/json',
        produces: 'application/json',
    })
    async create(@Body() dto: CreateJournalRequestDto): Promise<BaseResponseDto<JournalResponseDto>> {
        const result = await this.journalsService.create(dto);
        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            timestamp: new Date(),
            message: 'Journal created successfully',
            data: result,
        };
    }
}
