import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class GetMonthlyPnLCalendarQueryDto {
    @ApiProperty({ example: 1, description: 'Bulan (1-12)', minimum: 1, maximum: 12 })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(12)
    @Type(() => Number)
    month: number;

    @ApiProperty({ example: 2026, description: 'Tahun', minimum: 2000 })
    @IsNotEmpty()
    @IsInt()
    @Min(2000)
    @Type(() => Number)
    year: number;
}
