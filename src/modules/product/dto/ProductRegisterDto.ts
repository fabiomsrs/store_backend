'product strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { UserEntity } from '../../user/user.entity';

export class ProductRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly value: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;

    user: UserEntity;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;
}
