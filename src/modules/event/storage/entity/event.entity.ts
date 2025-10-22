import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        name: 'name',
    })
    name!: string;

    @Column({
        type: 'int',
        name: 'total_seats',
    })
    totalSeats!: number;

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
