import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        ProductModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([PaymentRepository]),
    ],
    controllers: [PaymentController],
    exports: [PaymentService],
    providers: [PaymentService],
})
export class PaymentModule {}
