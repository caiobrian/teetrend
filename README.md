# TeeTrend

Este projeto é uma implementação de uma página de produto simplificada para um ecommerce ficticio.

## 🚀 Tecnologias Utilizadas

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- Husky (Git Hooks)
- Commitlint

## 🎯 Funcionalidades Implementadas

- Visualização de produtos com variantes (cores, tamanhos)
- Carrinho de compras
- Interface responsiva
- Consulta na API do Via Cep

## 🛠️ Como Executar

1. Clone o repositório

```bash
git clone [url-do-repositorio]
cd teetrend
```

2. Instale as dependências

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
  ├── app/          # Páginas e layouts (Next.js App Router)
  ├── components/   # Componentes React reutilizáveis
  ├── hooks/        # Hooks customizados
  ├── lib/          # Utilitários e configurações
  ├── services/     # Serviços e integrações
  ├── styles/       # Estilos globais
  └── types/        # Definições de tipos TypeScript
```

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código com Prettier

## 📝 Convenções de Commit

O projeto utiliza commitlint para padronização das mensagens de commit. Os commits devem seguir o formato:

```
tipo: mensagem curta
```

Tipos permitidos: feat, fix, docs, style, refactor, test, chore

## 🎨 Design e UX

O projeto foi desenvolvido com foco em:

- Interface limpa e moderna
- Experiência de usuário intuitiva
- Responsividade em diferentes dispositivos
- Feedback visual para ações do usuário
- Acessibilidade básica
