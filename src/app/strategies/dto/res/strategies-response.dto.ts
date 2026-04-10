import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CanvasBackground } from '../../entities/strategy.entity';
import { HistoryActionType } from '../../entities/canvas-history.entity';

export class ViewportDto {
    @ApiProperty({ example: -240.5 })
    @Expose()
    viewportX: number;

    @ApiProperty({ example: -120.0 })
    @Expose()
    viewportY: number;

    @ApiProperty({ example: 1.25 })
    @Expose()
    zoom: number;
}

export class CanvasSettingsDto {
    @ApiProperty({ enum: CanvasBackground, example: CanvasBackground.DOTS })
    @Expose()
    background: CanvasBackground;

    @ApiProperty({ example: '#ffffff' })
    @Expose()
    backgroundColor: string;

    @ApiProperty({ example: true })
    @Expose()
    snapToGrid: boolean;

    @ApiProperty({ example: 20 })
    @Expose()
    gridSize: number;
}

export class CanvasHistoryItemDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @Expose()
    id: string;

    @ApiProperty({ enum: HistoryActionType })
    @Expose()
    actionType: HistoryActionType;

    @ApiPropertyOptional({ nullable: true })
    @Expose()
    label: string | null;

    @ApiProperty({ example: 3 })
    @Expose()
    stackIndex: number;

    @ApiProperty()
    @Expose()
    createdAt: Date;
}

export class StrategiesResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty({ example: 'My Strategy' })
    @Expose()
    title: string;

    @ApiPropertyOptional({ nullable: true })
    @Expose()
    content: string | null;

    @ApiPropertyOptional({ nullable: true })
    @Expose()
    description: string | null;

    @ApiPropertyOptional({ nullable: true })
    @Expose()
    lastEditedAt: Date;

    @ApiProperty({ type: () => ViewportDto })
    @Expose()
    @Type(() => ViewportDto)
    viewport: ViewportDto;

    @ApiProperty({ type: () => CanvasSettingsDto })
    @Expose()
    @Type(() => CanvasSettingsDto)
    canvasSettings: CanvasSettingsDto;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;
}

export class RestoreSnapshotResultDto {
    @ApiProperty()
    restoredFromId: string;

    @ApiProperty()
    elementCount: number;
}
