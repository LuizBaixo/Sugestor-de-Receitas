# 🥗 Sugestor de Receitas

Sistema web para sugestão de receitas com base nos ingredientes disponíveis do usuário. O projeto utiliza autenticação JWT, integração com a API Spoonacular, e interface responsiva com React + Tailwind CSS.

---

## 🔧 Tecnologias Utilizadas

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT para autenticação
- dotenv
- Spoonacular API

### Frontend:
- React.js (com Vite)
- Tailwind CSS
- React Router DOM

---

## 📦 Instalação

### Pré-requisitos:
- Node.js (v18+)
- MongoDB Atlas ou local
- Conta na [Spoonacular](https://spoonacular.com/food-api) para obter a API key

---

### 📁 Clonando o projeto:

```bash
git clone https://github.com/seu-usuario/sugestor-receitas.git
cd sugestor-receitas
```

---

## ▶️ Backend

### 📁 Acesse a pasta:
```bash
cd backend
```

### 📦 Instale as dependências:
```bash
npm install
```

### 📄 Crie um arquivo `.env`:
```env
MONGO_URI=mongodb://localhost:27017/sugestor
JWT_SECRET=sua_chave_secreta
SPOONACULAR_API_KEY=sua_api_key_aqui
```

### 🚀 Inicie o servidor:
```bash
node server.js
```

Servidor disponível em `http://localhost:5000`

---

## 💻 Frontend

### 📁 Acesse a pasta:
```bash
cd frontend
```

### 📦 Instale as dependências:
```bash
npm install
```

### 🌀 Tailwind CSS:
Já está configurado usando o método oficial com Vite:
- `tailwind.config.js`
- `postcss.config.js`
- `index.css` com diretivas `@tailwind`

### 🚀 Inicie o frontend:
```bash
npm run dev
```

Frontend disponível em `http://localhost:5173`

---

## 🔐 Rotas de API

### Auth:
- `POST /api/auth/register` – Criação de usuário
- `POST /api/auth/login` – Login do usuário

### Ingredientes:
- `GET /api/user/ingredients` – Lista os ingredientes do usuário
- `POST /api/user/ingredients` – Adiciona ingrediente
- `DELETE /api/user/ingredients/:name` – Remove ingrediente

### Sugestões de receitas:
- `GET /api/recipes/suggest` – Lista receitas baseado nos ingredientes do usuário
- `GET /api/recipes/:id` – Detalhes da receita (ingredientes + modo de preparo)

### Spoonacular:
- `GET /api/spoonacular/ingredients?query=nome` – Autocomplete de ingredientes

---

## 📸 Funcionalidades

- ✅ Autenticação com login e cadastro
- ✅ Adição e remoção de ingredientes
- ✅ Sugestão de receitas com base nos ingredientes
- ✅ Modal com detalhes da receita (imagem, ingredientes e modo de preparo)
- ✅ UI moderna com tema escuro via Tailwind CSS
- ✅ Autocomplete inteligente com imagens dos ingredientes

---

## 📂 Estrutura de Pastas

```
backend/
├── models/
├── routes/
├── middleware/
├── server.js
└── .env

frontend/
├── components/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Ingredients.jsx
│   └── RecipeSuggestions.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧪 Teste Rápido

1. Acesse `http://localhost:5173`
2. Cadastre um usuário
3. Vá para Ingredientes
4. Adicione alguns ingredientes
5. Vá para Receitas
6. Clique em uma receita → veja o modal com detalhes

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais.  
Sinta-se à vontade para modificar, clonar e contribuir.
