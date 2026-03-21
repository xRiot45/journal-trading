import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { UserEntity } from 'src/app/users/entities/user.entity';

@Entity('assets')
export class AssetEntity extends BaseEntity {
    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'original_name' })
    originalName: string;

    @Column({ name: 'storage_key' })
    storageKey: string;

    @Column({ name: 'storage_url' })
    storageUrl: string;

    @Column({ name: 'mime_type' })
    mimeType: string;

    @Column({ name: 'size_bytes', type: 'bigint' })
    sizeBytes: number;

    // Relations
    @ManyToOne(() => UserEntity, u => u.assets)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
