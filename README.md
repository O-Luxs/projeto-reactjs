## Integrantes da Equipe
- Luis Gustavo Ferreira Sluzala

## Funcionalidades

* **Listar Dicas:** Busca e exibe a lista de dicas cadastradas na API.
* **Cadastrar Dica:** Permite adicionar uma nova dica (Conceito e Curiosidade) através de um formulário.
* **Excluir Dica:** Permite remover uma dica da lista.
* **Atualizar Lista:** Botão para forçar uma nova busca (GET) na API e atualizar a lista.
* **Popular Dados (Teste):** Botão que cadastra 5 dicas de exemplo de uma só vez para fins de teste.

## Tecnologias Utilizadas

* **Frontend:** ReactJS (com Vite)
* **API Mock:** Mockoon (para simular um backend RESTful)

---

## Como Executar o Projeto

Para rodar este projeto localmente, você precisa iniciar duas partes: a **API Mock (Mockoon)** e a **Aplicação React**.

### 1. Iniciar a API (Mockoon)

A API REST é simulada pelo Mockoon e sua configuração está salva no arquivo `mockoon-environment.json`.

1.  **Baixe e instale o Mockoon:** [mockoon.com](https://mockoon.com/)
2.  Abra o Mockoon.
3.  Clique em **"Open environment"** (ícone de pasta) e selecione o arquivo `mockoon-environment.json` deste repositório.
4.  Com o ambiente "Mural de Curiosidades React" carregado, clique no botão **"Start server"** (ícone de "play" verde).

A API agora está rodando em `http://localhost:3000`.

### 2. Iniciar a Aplicação React

Em um terminal separado, na raiz do projeto:

1. npm install
2. npm run dev

## Endpoints da API
A API (Mockoon) responde na URL base: http://localhost:3001

### POST /tips
Cria uma nova dica.

Body (Exemplo):

JSON

{
  "conceito": "Renderização Condicional",
  "curiosidade": "Você pode usar '&&' para renderizar algo apenas se a condição for verdadeira."
}
Response: Status 201 Created (corpo: o objeto da dica criada, com ID).

### GET /tips
Lista todas as dicas cadastradas.

Response: Status 200 OK (corpo: array de dicas) ou 204 No Content (se vazio).

### DELETE /tips/:id
Deleta uma dica específica pelo ID.

Exemplo: DELETE /tips/1

Response: Status 204 No Content.
