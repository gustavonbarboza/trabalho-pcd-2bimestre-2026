# Petz — Sistema de Adoção de Animais

API REST para gerenciamento de animais disponíveis para adoção, desenvolvida com **Node.js**, **Express** e **PostgreSQL**.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 14 ou superior)

---

## Passo a passo para rodar o projeto

### 1. Criar o banco de dados

Abra o **pgAdmin** ou o terminal do PostgreSQL (`psql`) e crie o banco:

```sql
CREATE DATABASE petz;
```

### 2. Criar a tabela

Com o banco `petz` selecionado, execute o conteúdo do arquivo [`create-table.sql`](create-table.sql):

```sql
CREATE TABLE animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    porte VARCHAR(20) NOT NULL,
    idade VARCHAR(20) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    raca VARCHAR(100) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    descricao TEXT,
    status CHAR(1) NOT NULL DEFAULT 'D'
);
```

> `status` aceita dois valores: `D` (disponível) ou `I` (indisponível).

### 3. Popular o banco com os dados iniciais

Execute o conteúdo do arquivo [`insert.sql`](insert.sql) para inserir os animais de exemplo.

No pgAdmin, basta abrir o arquivo e clicar em **Execute**. Pelo terminal:

```bash
psql -U postgres -d petz -f insert.sql
```

### 4. Configurar a conexão com o banco

Abra o arquivo `backend/src/config/db.js` e ajuste as credenciais conforme o seu ambiente:

```js
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',   // seu usuário do PostgreSQL
  password: '',       // sua senha
  database: 'petz',
  port: 5432,
});
```

### 5. Instalar as dependências do backend

```bash
cd backend
npm install
```

### 6. Iniciar o servidor

```bash
npm start
```

O servidor vai subir em `http://localhost:3001`.

---

## Estrutura do projeto

```
backend/
├── server.js                    # Entry point — inicia o servidor
└── src/
    ├── app.js                   # Configuração do Express e rotas
    ├── config/
    │   └── db.js                # Conexão com o PostgreSQL
    ├── controllers/
    │   └── animaisController.js # Lógica de negócio
    └── routes/
        └── animais.js           # Definição das rotas
```

---

## Rotas disponíveis

Base URL: `http://localhost:3001/api/animais`

| Método   | Rota                  | Descrição                                      |
|----------|-----------------------|------------------------------------------------|
| `GET`    | `/`                   | Lista todos os animais (aceita filtros)        |
| `GET`    | `/:id`                | Busca um animal pelo ID                        |
| `POST`   | `/`                   | Cadastra um novo animal                        |
| `PUT`    | `/:id`                | Atualiza todos os dados de um animal           |
| `DELETE` | `/:id`                | Remove um animal                               |
| `PATCH`  | `/:id/status`         | Alterna o status entre disponível e indisponível |

### Filtros disponíveis no `GET /`

Todos os parâmetros são opcionais e podem ser combinados:

```
GET /api/animais?sexo=macho&porte=pequeno&idade=filhote&cor=preto&raca=labrador&localizacao=taguatinga
```

| Parâmetro    | Exemplo         |
|--------------|-----------------|
| `sexo`       | `macho`, `fêmea` |
| `porte`      | `pequeno`, `médio`, `grande` |
| `idade`      | `filhote`, `adulto`, `idoso` |
| `cor`        | `preto`, `caramelo` |
| `raca`       | `labrador`, `vira-lata` |
| `localizacao`| `taguatinga`, `asa sul` |

### Exemplo de corpo para `POST` e `PUT`

```json
{
  "nome": "Thor",
  "sexo": "macho",
  "porte": "grande",
  "idade": "adulto",
  "cor": "preto",
  "raca": "Labrador",
  "localizacao": "Ceilândia, Brasília, DF",
  "descricao": "Muito brincalhão e enérgico.",
  "status": "D"
}
```

### Resposta do `PATCH /:id/status`

```json
{
  "mensagem": "Animal marcado como indisponível",
  "status": "I"
}
```
