'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserDto } from '../../user/dto/UserDto';
import { ProductEntity } from '../product.entity';

export class ProductDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    value: number;

    @ApiPropertyOptional()
    quantity: number;

    @ApiPropertyOptional({ type: UserDto })
    user: UserDto;

    @ApiPropertyOptional()
    description: string;

    constructor(product: ProductEntity) {
        super(product);
        this.name = product.name;
        this.quantity = product.quantity;
        this.value = product.value;
        this.description = product.description;
    }
}
