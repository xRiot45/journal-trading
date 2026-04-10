import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { StrategiesService } from './strategies.service';
import { StrategiesRequestDto } from './dto/req/strategies-request.dto';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { StrategiesResponseDto } from './dto/res/strategies-response.dto';
import { ApiDocGenericResponse } from 'src/common/decorators/api-doc.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Strategies')
@Controller('strategies')
@UseGuards(JwtAuthGuard)
export class StrategiesController {
    constructor(private readonly strategiesService: StrategiesService) {}

    // ── DOCUMENT CRUD ──────────────────────────────────────────────────────────

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiDocGenericResponse({
        summary: 'Create a new strategy (canvas)',
        auth: true,
        body: StrategiesRequestDto,
        response: StrategiesResponseDto,
        status: HttpStatus.CREATED,
        consumes: 'application/json',
        produces: 'application/json',
    })
    async create(@Body() dto: StrategiesRequestDto): Promise<BaseResponseDto<StrategiesResponseDto>> {
        const result = await this.strategiesService.create(dto);
        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            timestamp: new Date(),
            message: 'Strategy created successfully',
            data: result,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiDocGenericResponse({
        summary: 'Get all strategies',
        auth: true,
        response: StrategiesResponseDto,
        status: HttpStatus.OK,
        produces: 'application/json',
    })
    async findAll(): Promise<BaseResponseDto<StrategiesResponseDto[]>> {
        const result = await this.strategiesService.findAll();
        return {
            success: true,
            statusCode: HttpStatus.OK,
            timestamp: new Date(),
            message: 'Strategies fetched successfully',
            data: result,
        };
    }

    @Get(':strategyId')
    @HttpCode(HttpStatus.OK)
    @ApiDocGenericResponse({
        summary: 'Get a strategy by ID',
        auth: true,
        response: StrategiesResponseDto,
        status: HttpStatus.OK,
        produces: 'application/json',
        params: [{ name: 'strategyId', description: 'Strategy ID' }],
    })
    async findOne(@Param('strategyId') strategyId: string): Promise<BaseResponseDto<StrategiesResponseDto>> {
        const result = await this.strategiesService.findOne(strategyId);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            timestamp: new Date(),
            message: 'Strategy fetched successfully',
            data: result,
        };
    }
}
