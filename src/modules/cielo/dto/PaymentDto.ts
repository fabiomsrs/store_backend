import { ApiProperty } from '@nestjs/swagger';

import { EnumCardType } from '../../../common/constants/card-types';
import { CreditCardDto } from './CreditCardDto';

export class PaymentDto {
    @ApiProperty()
    readonly amount: number;

    @ApiProperty({ type: CreditCardDto })
    readonly creditCard: CreditCardDto;

    @ApiProperty()
    installments: number;

    @ApiProperty({ enum: EnumCardType })
    type: EnumCardType;
}
