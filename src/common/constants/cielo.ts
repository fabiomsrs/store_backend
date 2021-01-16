import { Cielo, CieloConstructor } from 'cielo';

const cieloParams: CieloConstructor = {
    merchantId: '',
    merchantKey: '',
    sandbox: true, // Opcional - Ambiente de Testes
    debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
};

export const cielo = new Cielo(cieloParams);
