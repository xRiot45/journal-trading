import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TradeDirection } from '../../common/enum/trade-direction.enum';
import { BasedOnPlan } from '../../common/enum/based-on-plan.enum';
import { TradeStatus } from '../../common/enum/trade-status.enum';
import { Expose } from 'class-transformer';
import { PairResponseDto } from 'src/app/pairs/dto/res/pair-response.dto';
import { StrategiesResponseDto } from 'src/app/strategies/dto/res/strategies-response.dto';

export class JournalResponseDto {
    @ApiProperty({ description: 'Journal ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @Expose()
    id: string;

    @ApiProperty({ description: 'Trading date', example: '2025-01-15' })
    @Expose()
    date: Date;

    @ApiProperty({ description: 'Trade direction', enum: TradeDirection, example: TradeDirection.BUY })
    @Expose()
    direction: TradeDirection;

    @ApiProperty({ description: 'Trade result status', enum: TradeStatus, example: TradeStatus.PROFIT })
    @Expose()
    status: TradeStatus;

    @ApiProperty({ description: 'Lot size used in this trade', example: 0.1 })
    @Expose()
    lotSize: number;

    @ApiProperty({ description: 'Entry price of the trade', example: 1.2345 })
    @Expose()
    entryPrice: number;

    @ApiProperty({ description: 'Time when the trade was entered', example: '08:30:00' })
    @Expose()
    entryTime: string;

    @ApiPropertyOptional({ description: 'Closing price of the trade', example: 1.24 })
    @Expose()
    closingPrice: number;

    @ApiPropertyOptional({ description: 'Time when the trade was closed', example: '10:45:00' })
    @Expose()
    closingTime: string;

    @ApiPropertyOptional({ description: 'Take Profit level', example: 1.25 })
    @Expose()
    takeProfit: number;

    @ApiPropertyOptional({ description: 'Stop Loss level', example: 1.23 })
    @Expose()
    stopLoss: number;

    @ApiPropertyOptional({
        description: 'Profit and Loss value in cent currency format',
        example: 55.0,
    })
    @Expose()
    profitAndLoss: number;

    @ApiPropertyOptional({ description: 'Risk ratio of the trade', example: 1.5 })
    @Expose()
    riskRatio: number | null;

    @ApiPropertyOptional({ description: 'Reward ratio of the trade', example: 2.5 })
    @Expose()
    rewardRatio: number | null;

    @ApiProperty({ description: 'Whether the trade was based on a plan', enum: BasedOnPlan, example: BasedOnPlan.YES })
    @Expose()
    basedOnPlan: BasedOnPlan;

    @ApiPropertyOptional({
        description: 'Additional notes about this trade',
        example: 'Strong breakout setup.',
        nullable: true,
    })
    @Expose()
    note: string | null;

    @ApiProperty({ description: 'Pair associated with this trade', example: PairResponseDto })
    @Expose()
    pair: PairResponseDto;

    @ApiPropertyOptional({
        description: 'Strategy associated with this trade',
        example: StrategiesResponseDto,
        nullable: true,
    })
    @Expose()
    strategy: StrategiesResponseDto;

    @ApiProperty({ description: 'Record creation timestamp', example: '2025-01-15T08:30:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ description: 'Record last update timestamp', example: '2025-01-15T10:45:00.000Z' })
    @Expose()
    updatedAt: Date;
}
