import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ProductEntity } from '../../product/product.entity';
import { CustomerDto } from './CustomerDto';
import { PaymentDto } from './PaymentDto';

export class TransactionDto {
    @IsNotEmpty()
    @ApiProperty({ type: CustomerDto })
    readonly customer: CustomerDto;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly merchantOrderId: string;

    @IsNotEmpty()
    @ApiProperty({ type: PaymentDto })
    payment: PaymentDto;
}
