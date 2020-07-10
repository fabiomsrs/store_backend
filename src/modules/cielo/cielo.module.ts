import { Module } from '@nestjs/common';

import { CieloController } from './cielo.controller';

@Module({
    controllers: [CieloController],
})
export class CieloModule {}
