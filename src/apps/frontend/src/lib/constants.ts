/**
 * CEAP (Cota para o Exercício da Atividade Parlamentar)
 * Valores mensais máximos por estado (UF) de acordo com o Ato da Mesa 43/2009 e atualizações.
 * Referência aproximada para o cálculo de utilização da cota.
 */
export const CEAP_CEILINGS: Record<string, number> = {
    'AC': 49655.05, 'AL': 45577.62, 'AM': 48943.51, 'AP': 48434.90, 'BA': 44030.13,
    'CE': 47468.96, 'DF': 35500.27, 'ES': 41940.35, 'GO': 42801.37, 'MA': 46618.33,
    'MG': 40994.49, 'MS': 45196.11, 'MT': 44101.99, 'PA': 46995.12, 'PB': 46583.56,
    'PE': 46077.06, 'PI': 45558.12, 'PR': 43441.53, 'RJ': 40226.79, 'RN': 46903.66,
    'RO': 48310.83, 'RR': 51397.66, 'RS': 45290.03, 'SC': 44521.90, 'SE': 44966.59,
    'SP': 41655.45, 'TO': 44342.34
};

export const DEFAULT_CEILING = 40000.00;
