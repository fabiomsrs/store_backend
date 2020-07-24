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
import { CaptureRequestModel } from 'cielo/src/models/credit-card/capture.request.model';
import { CaptureResponseModel } from 'cielo/src/models/credit-card/capture.response.model';
import { TransactionCreditCardResponseModel } from 'cielo/src/models/credit-card/transaction-credit-card.response.model';

import { cielo } from '../../common/constants/cielo';
import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { PaymentService } from '../payment/payment.service';
import { UserEntity } from '../user/user.entity';
import { TransactionDto } from './dto/TransactionDto';

@Controller('cielo')
@ApiTags('cielo')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CieloController {
    constructor(private _paymentService: PaymentService) {}

    @Post('transaction')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    async transaction(
        @Body() transactionDto: TransactionDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @AuthUser() user: UserEntity,
    ): Promise<TransactionCreditCardResponseModel> {
        return cielo.creditCard.transaction(transactionDto);
    }

    @Get('capture/:paymentId')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    async captureTransaction(
        @Param('paymentId') paymentId: string,
    ): Promise<CaptureResponseModel> {
        const captureTransaction: CaptureRequestModel = {
            paymentId,
        };
        const capture = await cielo.creditCard.captureSaleTransaction(
            captureTransaction,
        );
        this._paymentService.executePayment(paymentId, capture.status);
        return capture;
    }
}
