# Movie Store (Angular)

Este projeto é uma aplicação de e-commerce para uma loja de filmes, desenvolvida com Angular. A interface utiliza componentes do Angular Material para uma experiência de usuário moderna e responsiva.

## Sobre o Projeto

A Movie Store permite que os usuários naveguem por um catálogo de filmes, vejam detalhes como preço e descrição, e adicionem itens a um carrinho de compras. A aplicação também conta com um sistema de autenticação: usuários autenticados têm permissões elevadas, como a capacidade de adicionar, editar e remover filmes do catálogo.

O projeto foi estruturado para ser modular e escalável, utilizando as melhores práticas do Angular, como o uso de serviços para a lógica de negócios, componentes reutilizáveis e rotas bem definidas com guardas de proteção.

## Funcionalidades Principais

*   **Catálogo de Filmes:** Exibição dos filmes em formato de cards, com imagem, título, preço e descrição.
*   **Autenticação de Usuários:** Páginas de login e cadastro. O acesso a funcionalidades de gerenciamento (adicionar, editar, remover) é restrito a usuários autenticados.
*   **Gerenciamento de Filmes (CRUD):**
    *   **Criação:** Formulário para adicionar novos filmes, incluindo upload de imagem com preview.
    *   **Edição:** Formulário preenchido com os dados atuais do filme para fácil atualização.
    *   **Remoção:** Exclusão de filmes do catálogo com uma caixa de diálogo para confirmação.
*   **Carrinho de Compras:** Adição dinâmica de itens ao carrinho, que pode ser acessado a qualquer momento pelo header.
*   **Internacionalização (i18n):** Suporte para os idiomas Português (pt-br) e Inglês (en-us), com a possibilidade de trocar o idioma diretamente no header da aplicação.

## Checklist de Requisitos

- [X] Catálogo com os itens, com cada um representado como um card contendo: imagem, título, preço e descrição.
- [X] Para cada item do catálogo, devem haver três botões: adicionar ao carrinho, edição e remoção (usem ícones).
- [X] Os botões de edição e remoção só aparecerão para alguém estiver logado.
- [ ] Cada item deve possuir: título/nome, descrição, **data de criação**, preço, quantidade no estoque, imagem ilustrativa. (*Observação: o campo "data de criação" não está implementado no modelo de dados atual.*)
- [X] Deve haver uma página de login e uma página de cadastro, caso a pessoa não possua conta.
- [X] Deve haver um header com navegação e um botão para fazer o login ou logout (o botão de login só aparece quando o usuário esta deslogado, e o de logout no caso contrário).
- [X] Um usuário é definido por: nome, email, senha.
- [ ] Só uma pessoa logada pode acessar QUALQUER página de cadastro, independente se é cadastro de item ou de usuário. (*Observação: a página de cadastro de usuário atualmente é pública.*)
- [ ] Um usuário deslogado só poderá ver/acessar a página de catálogo. (*Observação: usuários deslogados também podem acessar as páginas de login e cadastro de usuário.*)
- [X] Na página de cadastro de um item, deve ser feito o upload da imagem (com preview).
- [X] A página de edição de um item deve ser igual à de cadastro, porém trazendo os valores atuais e um preview da imagem ilustrativa.
- [X] Ao clicar no botão de remoção de um item, deve ser aberto um pop-up perguntando se o usuário tem certeza desta ação.
- [X] Ao clicar no botão de adicionar ao carrinho, o item deve ser dinamicamente adicionado ao carrinho.
- [X] Deve haver internacionalização através da escolha da língua PT ou EN através de um botão no header.

## Como Executar o Projeto

(Esta seção pode ser mantida do README original, se aplicável, ou adaptada conforme necessário)

### Pré-requisitos

*   Node.js (versão 16 ou superior)
*   npm (versão 8 ou superior)
*   Angular CLI (opcional)
*   Uma API de backend para fornecer os dados dos filmes. Este frontend foi projetado para funcionar com a API de exemplo `movies-api` disponível em: `https://github.com/Kirink212/api-examples`.

### Passos

1.  **Clone o repositório do backend e inicie a API:**
    ```bash
    git clone https://github.com/Kirink212/api-examples.git
    cd api-examples/movies-api
    npm install
    npm run start
    ```
    A API estará rodando em `http://localhost:3000`.

2.  **Instale as dependências do frontend:**
    ```bash
    npm install
    ```

3.  **Execute a aplicação frontend:**
    ```bash
    npm start
    ```
    A aplicação será aberta em `http://localhost:4200`.

    ### Agradecimentos

    formulario de filme para edição de filme