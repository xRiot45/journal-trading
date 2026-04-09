import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiDocGenericResponse } from 'src/common/decorators/api-doc.decorator';
import { CalendarResponseDto } from './dto/res/calendar-response.dto';
import { GetMonthlyPnLCalendarQueryDto } from './dto/req/get-monthly-pnl-calendar-query.dto';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiDocGenericResponse({
        summary: 'Get monthly PnL calendar',
        description: 'Get monthly PnL calendar',
        auth: true,
        response: CalendarResponseDto,
        status: HttpStatus.OK,
        produces: 'application/json',
        queries: [
            { name: 'month', type: 'number', required: true },
            { name: 'year', type: 'number', required: true },
        ],
    })
    async getMonthlyPnLCalendar(
        @Query() query: GetMonthlyPnLCalendarQueryDto,
    ): Promise<BaseResponseDto<CalendarResponseDto>> {
        const result = await this.calendarService.getMonthlyPnLCalendar(query.month, query.year);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            timestamp: new Date(),
            message: 'PnL Monthly Calendar fetched successfully',
            data: result,
        };
    }
}
