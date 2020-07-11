import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { PaymentEntity } from './payment.entity';
import { PaymentService } from './payment.service';

@Controller('payments')
@ApiTags('payments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class PaymentController {
    constructor(private _paymentService: PaymentService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getPayments(@AuthUser() user: UserEntity): Promise<PaymentEntity[]> {
        return this._paymentService.findByUser(user);
    }
}
