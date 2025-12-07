# NexumRH - Frontend 

<br />

<div align="center">
    <img src="# Nome do Projeto - Frontend 

<br />

<div align="center">
    <img src="https://ik.imagekit.io/codequeens/rh_logo.jpg?updatedAt=1761765415212" title="source: imgur.com" width="50%"/>
</div>

<br /><br />

## 1. Descrição

O NexumRH é um sistema de gestão de recursos humanos projetado para organizar, acompanhar e potencializar os processos internos de empresas.

A aplicação é estruturada em três entidades principais:

1. Usuário: representa os responsáveis pela gestão do sistema (administradores e gestores), com diferentes níveis de acesso e funções específicas, garantindo segurança e controle das operações.
2. Colaborador: centraliza os dados de funcionários da organização, reunindo informações de identificação, cargo, setor e demais dados relevantes para acompanhamento de sua trajetória profissional.
3. Departamento: organiza a estrutura interna da empresa, permitindo o cadastro e gerenciamento de setores, facilitando a vinculação de colaboradores e possibilitando uma visão clara da distribuição de recursos humanos.

------

## 2. Recursos

A API da NexumRH foi desenvolvida em Java, utilizando o framework Spring, e segue os princípios da Arquitetura MVC e REST. Ela disponibiliza endpoints para o gerenciamento dos recursos Colaboradores, Departamentos e Usuário, com testes de CRUD (Create, Read, Update e Delete) realizados por meio do Insomnia.

2.1. Principais Funcionalidades
1. Centralização das informações de colaboradores, setores e gestores em uma única plataforma.
2. Gestão eficiente de usuários, com perfis diferenciados de acesso e responsabilidade.
3. Organização hierárquica clara, por meio do relacionamento entre colaboradores e departamentos.
4. Controle completo do ciclo de vida do colaborador, desde o cadastro até movimentações internas.
5. Possibilidade de ampliação de funções extras, como: geração de relatórios de desempenho, faltas/ausências (taxas de absenteísmo), métricas para apoiar decisões estratégicas e integração via API com sistemas externos de folha de pagamento ou controle de ponto.

------

## 3. Tecnologias

| Item                         | Descrição  |
| ---------------------------- | ---------- |
| **Servidor**                 | Node JS    |
| **Linguagem de programação** | TypeScript |
| **Biblioteca**               | React JS   |
| **Build**                    | Vite       |
| **Framework de Estilização** | Tailwind   |

---

## 4. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [yarn](https://yarnpkg.com/)
- API NestJS API NestJS ([Repositório da API](link do repositório da api))

---

## 5. Configuração e Execução

1. Clone o repositório do Projeto
2. Instale as dependências: `yarn`
3. Clone o repositório do Projeto Backend: [Link](link do repositório do Backend)
4. Siga as instruções de **Configuração e Execução** descritas no README do Projeto Backend
5. Adicione o endereço de execução do projeto na variável de ambiente **VITE_API_URL**, no projeto React
6. Execute o Projeto React: `yarn dev`
7. A aplicação React estará disponível no endereço: `http://localhost:5173`

---

## 6. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Estrutura de dados da aplicação-
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (alerts)
└── App.tsx           # Componente principal da aplicação
```

---

## 7. Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com a sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request" title="source: imgur.com" width="50%"/>
</div>


<br /><br />

