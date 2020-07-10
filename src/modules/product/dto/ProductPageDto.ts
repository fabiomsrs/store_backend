import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { ProductDto } from './ProductDto';

export class ProductsPageDto {
    @ApiProperty({
        type: ProductDto,
        isArray: true,
    })
    readonly data: ProductDto[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: ProductDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
