import { Injectable } from '@nestjs/common';

import { ProductService } from '../product/product.service';
import { UserEntity } from '../user/user.entity';
import { PaymentRegisterDto } from './dto/paymentRegisterDto';
import { PaymentEntity } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        public readonly paymentRepository: PaymentRepository,
        public readonly productService: ProductService,
    ) {}

    findOne(id: string): Promise<PaymentEntity> {
        return this.paymentRepository.findOne(id, { relations: ['products'] });
    }

    findByUser(user: UserEntity): Promise<PaymentEntity[]> {
        const queryBuilder = this.paymentRepository.createQueryBuilder(
            'payment',
        );
        queryBuilder.orWhere('payment.user = :user', {
            user: user.id,
        });
        return queryBuilder.getMany();
    }

    async createPayment(
        paymentRegisterDto: PaymentRegisterDto,
    ): Promise<PaymentEntity> {
        if (paymentRegisterDto.products) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            paymentRegisterDto.products.forEach(async (product) => {
                await this.productService.updateQuantity(
                    product.id,
                    product.quantity,
                );
            });
        }

        const payment = this.paymentRepository.create({
            ...paymentRegisterDto,
        });

        return this.paymentRepository.save(payment);
    }

    executePayment(id: string, status: number): string {
        let response;
        this.paymentRepository
            .update(id, { status })
            .then(() => {
                response = 'payment executed';
            })
            .catch(() => {
                response = 'payment failed';
            });
        return response;
    }
}
