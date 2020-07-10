import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CaptureRequestModel } from 'cielo/src/models/credit-card/capture.request.model';
import { CaptureResponseModel } from 'cielo/src/models/credit-card/capture.response.model';
import { TransactionCreditCardRequestModel } from 'cielo/src/models/credit-card/transaction-credit-card.request.model';

import { cielo } from '../../common/constants/cielo';
import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';

@Controller('cielo')
@ApiTags('cielo')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CieloController {
    @Post('transaction')
    @Roles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    async transaction(
        @Body() transactionDto: TransactionCreditCardRequestModel,
    ): Promise<CaptureResponseModel> {
        const transaction = await cielo.creditCard.transaction(transactionDto);
        const captureTransaction: CaptureRequestModel = {
            paymentId: transaction.payment.paymentId,
        };
        return cielo.creditCard.captureSaleTransaction(captureTransaction);
    }
}
