import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
    @ApiProperty()
    readonly name: string;
}
