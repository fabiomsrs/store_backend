import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { PaymentEntity } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(public readonly paymentRepository: PaymentRepository) {}

    findOne(id: string): Promise<PaymentEntity> {
        return this.paymentRepository.findOne(id);
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

    async createPayment(paymentDto: PaymentEntity): Promise<PaymentEntity> {
        const payment = this.paymentRepository.create({
            ...paymentDto,
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
