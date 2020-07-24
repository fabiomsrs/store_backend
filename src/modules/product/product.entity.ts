import { Check, Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { ProductDto } from './dto/ProductDto';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity<ProductDto> {
    @Column({ length: 50 })
    name: string;

    @Column()
    value: number;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne((type) => UserEntity)
    user: UserEntity;

    @Column({ default: 1 })
    @Check('quantity>=0')
    quantity: number;

    @Column({ nullable: true })
    description: string;

    dtoClass = ProductDto;
}
