# Fiscal da Cota Parlamentar

**Fiscal** é uma ferramenta de auditoria e transparência para monitorar os gastos da Cota Parlamentar (CEAP) de Deputados Federais do Brasil.

## 🏗️ Estrutura do Projeto (Monorepo)

O projeto utiliza **npm workspaces** para gerenciar os diferentes pacotes e aplicações:

- `src/apps/frontend`: Aplicação Web construída com React e Vite.
- `src/apps/functions`: Supabase Edge Functions para automações e lógica de backend.
- `src/packages/shared`: Tipagens e utilitários compartilhados entre frontend e backend.

## 🚀 Desenvolvimento

### Pré-requisitos
- Node.js (v18+)
- npm (v7+)

### Comandos
No diretório raiz:

```bash
# Instalar todas as dependências
npm install

# Iniciar o ambiente de desenvolvimento do Frontend
npm run dev

# Rodar testes (em breve)
npm test
```

## 🏛️ Documentação
Toda a especificação do projeto (PRD, Arquitetura, UX/UI) está disponível na pasta `/docs`.

---
— Orion, orquestrando o sistema 🎯
