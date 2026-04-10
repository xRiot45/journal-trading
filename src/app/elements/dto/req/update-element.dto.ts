import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsNumber,
    IsObject,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { CreateElementDto } from './create-element.dto';

export class UpdateElementDto extends PartialType(OmitType(CreateElementDto, ['strategyId', 'type'] as const)) {}

// One item inside a bulk payload
export class BulkUpdateItemDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Element ID to update' })
    @IsUUID()
    id: string;

    @ApiPropertyOptional({ example: 100 })
    @IsNumber()
    @IsOptional()
    x?: number;

    @ApiPropertyOptional({ example: 200 })
    @IsNumber()
    @IsOptional()
    y?: number;

    @ApiPropertyOptional({ example: 160 })
    @IsNumber()
    @IsOptional()
    width?: number;

    @ApiPropertyOptional({ example: 60 })
    @IsNumber()
    @IsOptional()
    height?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsNumber()
    @IsOptional()
    zIndex?: number;

    @ApiPropertyOptional({ example: false })
    @IsBoolean()
    @IsOptional()
    isLocked?: boolean;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;

    @ApiPropertyOptional({ example: { color: 'red' }, description: 'Merged with existing styleData' })
    @IsObject()
    @IsOptional()
    styleData?: Record<string, unknown>;

    @ApiPropertyOptional({ example: { label: 'Updated' }, description: 'Merged with existing contentData' })
    @IsObject()
    @IsOptional()
    contentData?: Record<string, unknown>;

    @ApiPropertyOptional({ example: null, nullable: true, description: 'null = move to root' })
    @IsUUID()
    @IsOptional()
    parentElementId?: string | null;
}

export class BulkUpdateElementsDto {
    @ApiProperty({ type: [BulkUpdateItemDto], description: 'Array of element updates (applied atomically)' })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => BulkUpdateItemDto)
    elements: BulkUpdateItemDto[];
}

export class ReparentElementDto {
    @ApiPropertyOptional({ example: null, nullable: true, description: 'New parent ID — null to move to root' })
    @IsUUID()
    @IsOptional()
    parentElementId: string | null;
}
