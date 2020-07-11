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
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { TransactionDto } from './dto/TransactionDto';

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
        @Body() transactionDto: TransactionDto,
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
        return cielo.creditCard.captureSaleTransaction(captureTransaction);
    }
}
