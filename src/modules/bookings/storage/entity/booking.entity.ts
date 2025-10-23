import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { EventEntity } from '@event/storage/entity';

@Entity('booking')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        name: 'user_id',
    })
    userId!: string;

    @Column({
        type: 'int',
        name: 'event_id',
    })
    eventId!: number;

    @ManyToOne(() => EventEntity, { nullable: false })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_at',
    })
    createAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'update_at',
    })
    updateAt!: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        name: 'delete_at',
    })
    deleteAt: Date | null;
}
