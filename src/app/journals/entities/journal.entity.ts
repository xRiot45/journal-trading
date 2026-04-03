import { PairEntity } from 'src/app/pairs/entities/pair.entity';
import { StrategyEntity } from 'src/app/strategies/entities/strategy.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// ---- Enums ----

export enum TradeDirection {
    BUY = 'Buy',
    SELL = 'Sell',
}

export enum TradeStatus {
    PROFIT = 'Profit',
    LOSS = 'Loss',
    DRAW = 'Draw',
}

export enum BasedOnPlan {
    YES = 1,
    NO = 0,
}

// ---- Entity ----

@Entity('journals')
export class JournalEntity extends BaseEntity {
    // ---- Date ----

    @Column({
        type: 'date',
        nullable: false,
        comment: 'Trading date',
    })
    date: Date;

    // ---- Direction ----

    @Column({
        type: 'enum',
        enum: TradeDirection,
        nullable: false,
        comment: 'Trade direction: Buy or Sell',
    })
    direction: TradeDirection;

    // ---- Status ----

    @Column({
        type: 'enum',
        enum: TradeStatus,
        nullable: false,
        comment: 'Trade result status: Profit, Loss, or Draw',
    })
    status: TradeStatus;

    // ---- Lot Size ----

    @Column({
        type: 'float',
        nullable: false,
        comment: 'Lot size used in this trade',
    })
    lotSize: number;

    // ---- Entry ----

    @Column({
        type: 'float',
        nullable: false,
        comment: 'Entry price of the trade',
    })
    entryPrice: number;

    @Column({
        type: 'time',
        nullable: false,
        comment: 'Time when the trade was entered',
    })
    entryTime: string;

    // ---- Closing ----

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Closing price of the trade',
    })
    closingPrice: number | null;

    @Column({
        type: 'time',
        nullable: true,
        comment: 'Time when the trade was closed',
    })
    closingTime: string | null;

    // ---- TP & SL ----

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Take Profit level',
    })
    tp: number | null;

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Stop Loss level',
    })
    sl: number | null;

    // ---- PnL ----

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Profit and Loss value in cent currency format',
    })
    pnl: number | null;

    // ---- Risk & Reward Ratio ----

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        comment: 'Risk ratio of the trade',
    })
    riskRatio: number | null;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        comment: 'Reward ratio of the trade',
    })
    rewardRatio: number | null;

    // ---- Based on Plan ----

    @Column({
        type: 'tinyint',
        width: 1,
        nullable: false,
        default: BasedOnPlan.NO,
        comment: 'Whether the trade was based on a plan: 1 = Yes, 0 = No',
    })
    basedOnPlan: BasedOnPlan;

    // ---- Note ----

    @Column({
        type: 'text',
        nullable: true,
        comment: 'Additional notes about this trade',
    })
    note: string | null;

    // ---- Relations ----

    @Column({
        nullable: false,
        comment: 'Foreign key referencing PairEntity',
    })
    pairId: number;

    @ManyToOne(() => PairEntity, { eager: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'pairId' })
    pair: PairEntity;

    @Column({
        nullable: true,
        comment: 'Foreign key referencing StrategyEntity',
    })
    strategyId: number | null;

    @ManyToOne(() => StrategyEntity, { eager: false, nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'strategyId' })
    strategy: StrategyEntity | null;
}
