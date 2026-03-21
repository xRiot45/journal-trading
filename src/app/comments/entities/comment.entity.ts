import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/shared/entities/base.entity';
import { DocumentEntity } from 'src/app/documents/entities/document.entity';
import { ElementEntity } from 'src/app/elements/entities/element.entity';

export enum CommentColor {
    YELLOW = 'yellow',
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
}

@Entity('comments')
export class CommentEntity extends BaseEntity {
    @Column({ name: 'document_id' })
    documentId: string;

    @Column({ name: 'element_id' })
    elementId: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ type: 'enum', enum: CommentColor, default: CommentColor.YELLOW })
    color: CommentColor;

    @Column({ name: 'is_resolved', default: false })
    isResolved: boolean;

    @Column({ name: 'resolved_at', nullable: true })
    resolvedAt: Date;

    // Relations
    @ManyToOne(() => DocumentEntity, d => d.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'document_id' })
    document: DocumentEntity;

    @ManyToOne(() => ElementEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'element_id' })
    element: ElementEntity;
}
