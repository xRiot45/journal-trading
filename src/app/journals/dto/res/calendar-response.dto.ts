// dto/calendar-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CalendarDaySummaryDto {
    @ApiProperty({ example: 1500.75, description: 'Total PnL dari semua hari profit' })
    @Expose()
    totalProfit: number;

    @ApiProperty({ example: -800.5, description: 'Total PnL dari semua hari loss' })
    @Expose()
    totalLoss: number;

    @ApiProperty({ example: 700.25, description: 'Net PnL keseluruhan bulan' })
    @Expose()
    netPnL: number;
}

export class CalendarDayDto {
    @ApiProperty({ example: '2026-01-15', description: 'Tanggal dalam format YYYY-MM-DD' })
    @Expose()
    date: string;

    @ApiProperty({ example: 15, description: 'Hari dalam bulan' })
    @Expose()
    day: number;

    @ApiProperty({ example: 250.5, description: 'Total Profit & Loss pada tanggal ini' })
    @Expose()
    totalPnL: number;

    @ApiProperty({ example: 3, description: 'Jumlah trade pada tanggal ini' })
    @Expose()
    tradeCount: number;

    @ApiProperty({
        example: 'profit',
        enum: ['profit', 'loss', 'neutral'],
        description: 'Status hari berdasarkan total PnL',
    })
    @Expose()
    status: 'profit' | 'loss' | 'neutral';
}

export class CalendarResponseDto {
    @ApiProperty({ example: 1, description: 'Bulan (1-12)' })
    @Expose()
    month: number;

    @ApiProperty({ example: 2026, description: 'Tahun' })
    @Expose()
    year: number;

    @ApiProperty({ type: () => CalendarDaySummaryDto })
    @Expose()
    @Type(() => CalendarDaySummaryDto)
    summary: CalendarDaySummaryDto;

    @ApiProperty({ type: () => [CalendarDayDto] })
    @Expose()
    @Type(() => CalendarDayDto)
    days: CalendarDayDto[];
}
