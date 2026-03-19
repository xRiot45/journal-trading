import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('pairs')
export class PairEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true,
    })
    description?: string;
}
