import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ProductDto } from './dto/ProductDto';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity<ProductDto> {
    @Column({ length: 50 })
    name: string;

    @Column()
    value: number;

    @Column({ nullable: true })
    description: string;

    dtoClass = ProductDto;
}
