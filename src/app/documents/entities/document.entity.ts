import { BaseEntity } from 'src/shared/entities/base.entity';
import { UserEntity } from './../../users/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ElementEntity } from 'src/app/elements/entities/element.entity';
import { CommentEntity } from 'src/app/comments/entities/comment.entity';

@Entity('documents')
export class DocumentEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({ name: 'thumbnail_url', nullable: true })
    thumbnailUrl: string;

    @Column({ name: 'user_id' })
    userId: string;

    // Full canvas state mind map tersimpan sebagai JSON string
    // null = dokumen baru / blank canvas
    @Column({ type: 'longtext', nullable: true })
    content: string;

    @Column({ name: 'is_starred', default: false })
    isStarred: boolean;

    @Column({ name: 'order_index', type: 'int', default: 0 })
    orderIndex: number;

    @Column({ name: 'last_edited_at', nullable: true })
    lastEditedAt: Date;

    // Relations
    @ManyToOne(() => UserEntity, u => u.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => ElementEntity, e => e.document)
    elements: ElementEntity[];

    @OneToMany(() => CommentEntity, c => c.document)
    comments: CommentEntity[];
}
