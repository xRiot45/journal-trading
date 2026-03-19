import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from './pagination.dto';

export class BaseResponseDto<T = void> {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;

    @Expose()
    @ApiProperty({ example: 201 })
    statusCode: number;

    @Expose()
    @ApiProperty({ example: 'Sample Messages!' })
    message?: string;

    @Expose()
    @Type(() => Date)
    @ApiProperty({ example: new Date().toISOString() })
    timestamp: Date;

    @Expose()
    @ApiPropertyOptional()
    data?: T;

    @Expose()
    @ApiPropertyOptional()
    meta?: PaginationMetaDto;
}
