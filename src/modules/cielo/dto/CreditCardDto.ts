import { ApiProperty } from '@nestjs/swagger';

import { EnumBrands } from '../../../common/constants/brand-types';

export class CreditCardDto {
    @ApiProperty({ enum: EnumBrands })
    brand: EnumBrands;

    @ApiProperty()
    readonly cardNumber: string;

    @ApiProperty()
    readonly holder: string;

    @ApiProperty()
    readonly securityCode: string;

    @ApiProperty()
    expirationDate: string;
}
