# Data Models

## Deputy
**Purpose:** Stores metadata about parlamentares.
```typescript
interface Deputy {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email: string;
  currentQuotaLimit: number; // Derived from UF table
}
```

## Expense
**Purpose:** Stores individual spending records retrieved from the API or Bulk files.
```typescript
interface Expense {
  id: string;
  deputadoId: number;
  tipoDespesa: string;
  valorDocumento: number;
  valorGlosado: number;
  valorLiquido: number;
  dataEmissao: string;
  nomeFornecedor: string;
  cnpjCpfFornecedor: string;
  tipoCnpjCpf: 1 | 2; // 1: CNPJ, 2: CPF
}
```
