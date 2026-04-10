import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StrategyEntity } from './strategy.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

export enum HistoryActionType {
    CREATE_ELEMENT = 'create_element',
    UPDATE_ELEMENT = 'update_element',
    DELETE_ELEMENT = 'delete_element',
    MOVE_ELEMENTS = 'move_elements',
    REPARENT_ELEMENT = 'reparent_element',
    BULK_UPDATE = 'bulk_update',
    CANVAS_SETTINGS = 'canvas_settings',
    RESTORE = 'restore',
}

@Entity('canvas_history')
export class CanvasHistoryEntity extends BaseEntity {
    @Column({ comment: 'FK to strategy (canvas)' })
    strategyId: string;

    @ManyToOne(() => StrategyEntity, s => s.history, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'strategyId' })
    strategy: StrategyEntity;

    @Column({ type: 'enum', enum: HistoryActionType, comment: 'Type of action that triggered this snapshot' })
    actionType: HistoryActionType;

    @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Human-readable label' })
    label: string | null;

    @Column({ type: 'longtext', comment: 'JSON snapshot of all elements at this point' })
    snapshot: string;

    @Column({ type: 'int', default: 0, comment: 'Ordering index within the strategy history stack' })
    stackIndex: number;
}
