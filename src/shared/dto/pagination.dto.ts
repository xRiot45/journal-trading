import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
    @ApiPropertyOptional({ example: 1, default: 1 })
    @Expose()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, default: 10 })
    @Expose()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({ example: 'bitcoin' })
    @Expose()
    @IsOptional()
    @IsString()
    @Transform(({ value }: { value: string }) => value?.trim())
    search?: string;

    @ApiPropertyOptional({ example: 'ASC', enum: ['ASC', 'DESC'], default: 'ASC' })
    @Expose()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value?.toUpperCase())
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC' = 'ASC';

    @ApiPropertyOptional({ example: 'name', description: 'Field to sort by' })
    @Expose()
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';
}

export class PaginationMetaDto {
    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 10 })
    limit: number;

    @ApiProperty({ example: 100 })
    totalItems: number;

    @ApiProperty({ example: 10 })
    totalPages: number;

    @ApiProperty({ example: true })
    hasNextPage: boolean;

    @ApiProperty({ example: false })
    hasPreviousPage: boolean;
}
