import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { ProductsPageDto } from './dto/ProductPageDto';
import { ProductRegisterDto } from './dto/ProductRegisterDto';
import { ProductsPageOptionsDto } from './dto/ProductsPageOptionsDto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(public readonly productRepository: ProductRepository) {}

    findOne(findData: FindConditions<ProductEntity>): Promise<ProductEntity> {
        return this.productRepository.findOne(findData);
    }

    async createProduct(
        productRegisterDto: ProductRegisterDto,
    ): Promise<ProductEntity> {
        const product = this.productRepository.create({
            ...productRegisterDto,
        });

        return this.productRepository.save(product);
    }

    async getProducts(
        pageOptionsDto: ProductsPageOptionsDto,
    ): Promise<ProductsPageDto> {
        const queryBuilder = this.productRepository.createQueryBuilder(
            'product',
        );
        const [products, productsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: productsCount,
        });
        return new ProductsPageDto(products.toDtos(), pageMetaDto);
    }

    async updateQuantity(id: string, quantity: number): Promise<any> {
        const product = await this.productRepository.findOne(id);
        return this.productRepository.update(id, {
            quantity: product.quantity - quantity,
        });
    }
}
