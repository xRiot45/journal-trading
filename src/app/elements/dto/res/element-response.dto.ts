import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ElementType } from '../../entities/element.entity';

export class ElementResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    strategyId: string;

    @ApiProperty()
    @Expose()
    identifier: string;

    @ApiProperty({ enum: ElementType })
    @Expose()
    type: ElementType;

    @ApiProperty()
    @Expose()
    x: number;

    @ApiProperty()
    @Expose()
    y: number;

    @ApiProperty()
    @Expose()
    width: number;

    @ApiProperty()
    @Expose()
    height: number;

    @ApiProperty()
    @Expose()
    zIndex: number;

    @ApiPropertyOptional({ nullable: true })
    @Expose()
    parentElementId: string | null;

    @ApiProperty()
    @Expose()
    isLocked: boolean;

    @ApiProperty()
    @Expose()
    isVisible: boolean;

    @ApiPropertyOptional({ type: () => [ElementResponseDto], description: 'Children (canvas load only)' })
    @Expose()
    @Type(() => ElementResponseDto)
    children?: ElementResponseDto[];

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;
}

export class CanvasResponseDto {
    @ApiProperty({ description: 'Strategy (canvas) ID' })
    strategyId: string;

    @ApiProperty({ type: [ElementResponseDto] })
    elements: ElementResponseDto[];

    @ApiProperty({ example: 42 })
    total: number;
}

export class BulkUpdateResultDto {
    @ApiProperty({ example: 5 })
    updated: number;

    @ApiProperty({ type: [ElementResponseDto] })
    elements: ElementResponseDto[];
}
