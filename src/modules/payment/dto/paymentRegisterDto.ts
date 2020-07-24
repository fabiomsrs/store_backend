import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { ProductDto } from '../../product/dto/ProductDto';
import { UserEntity } from '../../user/user.entity';

export class PaymentRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    user: UserEntity;

    @ApiProperty()
    @IsNotEmpty()
    installments: number;

    @ApiProperty()
    @IsOptional()
    products: ProductDto[];

    @ApiProperty()
    @IsNotEmpty()
    status: number;

    createdAt: Date;
}
