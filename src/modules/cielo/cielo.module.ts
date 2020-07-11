import { Module } from '@nestjs/common';

import { PaymentModule } from '../payment/payment.module';
import { CieloController } from './cielo.controller';

@Module({
    imports: [PaymentModule],
    controllers: [CieloController],
})
export class CieloModule {}
