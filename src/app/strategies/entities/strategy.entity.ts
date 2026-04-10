import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ElementEntity } from 'src/app/elements/entities/element.entity';
import { JournalEntity } from 'src/app/journals/entities/journal.entity';
import { CanvasHistoryEntity } from './canvas-history.entity';

export enum CanvasBackground {
    WHITE = 'white',
    GRID = 'grid',
    DOTS = 'dots',
    LINES = 'lines',
}

@Entity('strategies')
export class StrategyEntity extends BaseEntity {
    // ── Document Metadata ──────────────────────────────
    @Column({ type: 'varchar', length: 100, nullable: false })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    content?: string | null;

    @Column({ type: 'varchar', length: 250, nullable: true })
    description?: string;

    @Column({ type: 'datetime', nullable: true })
    lastEditedAt: Date;

    // ── Canvas Viewport State ──────────────────────────
    @Column({ type: 'float', default: 0, comment: 'Pan offset X (viewport)' })
    viewportX: number;

    @Column({ type: 'float', default: 0, comment: 'Pan offset Y (viewport)' })
    viewportY: number;

    @Column({ type: 'float', default: 1.0, comment: 'Zoom level (e.g. 0.5 = 50%, 2.0 = 200%)' })
    zoom: number;

    // ── Canvas Settings ────────────────────────────────
    @Column({
        type: 'enum',
        enum: CanvasBackground,
        default: CanvasBackground.DOTS,
        comment: 'Background style of the canvas',
    })
    background: CanvasBackground;

    @Column({ type: 'varchar', length: 20, default: '#ffffff', comment: 'Background color (hex)' })
    backgroundColor: string;

    @Column({ type: 'tinyint', width: 1, default: true, comment: 'Whether snap-to-grid is enabled' })
    snapToGrid: boolean;

    @Column({ type: 'int', default: 20, comment: 'Snap grid size in pixels' })
    gridSize: number;

    // ── Relations ──────────────────────────────────────
    @OneToMany(() => ElementEntity, e => e.strategy)
    elements: ElementEntity[];

    @OneToMany(() => JournalEntity, journal => journal.strategy)
    journals: JournalEntity[];

    @OneToMany(() => CanvasHistoryEntity, h => h.strategy)
    history: CanvasHistoryEntity[];
}
