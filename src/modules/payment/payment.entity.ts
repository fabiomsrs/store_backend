/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @ManyToOne((type) => UserEntity)
    user: UserEntity;

    @Column()
    installments: number;

    @ManyToMany((type) => ProductEntity)
    @JoinTable()
    products: ProductEntity[];

    @Column()
    status: number;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;
}
