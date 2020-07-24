import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { PaymentRegisterDto } from './dto/paymentRegisterDto';
import { PaymentEntity } from './payment.entity';
import { PaymentService } from './payment.service';

@Controller('payments')
@ApiTags('payments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class PaymentController {
    constructor(private _paymentService: PaymentService) {}

    @Post()
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    async payment(
        @Body() payment: PaymentRegisterDto,
        @AuthUser() user: UserEntity,
    ): Promise<PaymentEntity> {
        payment.user = user;
        const response = await this._paymentService.createPayment(payment);
        delete response.user;
        try {
            response.products.forEach((item) => {
                delete item.dtoClass;
            });
            return response;
        } catch {
            return response;
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getPayments(@AuthUser() user: UserEntity): Promise<PaymentEntity[]> {
        return this._paymentService.findByUser(user);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getPaymentById(@Param('id') id: string): Promise<PaymentEntity> {
        const response = await this._paymentService.findOne(id);
        try {
            response.products.forEach((item) => {
                delete item.dtoClass;
            });
            return response;
        } catch {
            return response;
        }
    }
}
