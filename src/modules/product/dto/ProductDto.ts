'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ProductEntity } from '../product.entity';

export class ProductDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    value: number;

    @ApiPropertyOptional()
    description: string;

    constructor(product: ProductEntity) {
        super(product);
        this.name = product.name;
        this.value = product.value;
        this.description = product.description;
    }
}
