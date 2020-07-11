import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { ProductDto } from './dto/ProductDto';
import { ProductsPageDto } from './dto/ProductPageDto';
import { ProductRegisterDto } from './dto/ProductRegisterDto';
import { ProductsPageOptionsDto } from './dto/ProductsPageOptionsDto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private _productService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ProductDto, description: 'Successfully Registered' })
    async productRegister(
        @Body() productRegisterDto: ProductRegisterDto,
        @AuthUser() user: UserEntity,
    ): Promise<ProductDto> {
        productRegisterDto.user = user;
        const createdProduct = await this._productService.createProduct(
            productRegisterDto,
        );

        return createdProduct.toDto();
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get products list',
        type: ProductsPageDto,
    })
    getProducts(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ProductsPageOptionsDto,
    ): Promise<ProductsPageDto> {
        return this._productService.getProducts(pageOptionsDto);
    }
}
