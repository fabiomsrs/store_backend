import { Cielo, CieloConstructor } from 'cielo';

const cieloParams: CieloConstructor = {
    merchantId: '86415780-89a9-4ff8-8c51-5502010788d8',
    merchantKey: 'GAVGANMCMUZFDBALWZJDFYKXFELGWELISZURLZRZ',
    sandbox: true, // Opcional - Ambiente de Testes
    debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
};

export const cielo = new Cielo(cieloParams);
