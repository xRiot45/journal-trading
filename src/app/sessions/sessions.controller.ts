import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiTags } from '@nestjs/swagger';
import { SessionDto } from './dto/req/session-request.dto';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { SessionResponseDto } from './dto/res/session-response.dto';
import { ApiDocGenericResponse } from 'src/common/decorators/api-doc.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Sessions')
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiDocGenericResponse({
        summary: 'Create a new Session',
        description: 'Create a new Session',
        auth: true,
        body: SessionDto,
        response: SessionResponseDto,
        status: HttpStatus.CREATED,
        consumes: 'application/json',
        produces: 'application/json',
        customResponses: [
            {
                status: HttpStatus.BAD_REQUEST,
                description: 'Bad Request',
            },
            {
                status: HttpStatus.CONFLICT,
                description: 'Conflict: Session name already exists',
            },
            {
                status: HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized',
            },
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                description: 'Internal Server Error',
            },
        ],
    })
    async create(@Body() dto: SessionDto): Promise<BaseResponseDto<SessionResponseDto>> {
        const result = await this.sessionsService.create(dto);
        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            timestamp: new Date(),
            message: 'Session created successfully',
            data: result,
        };
    }
}
