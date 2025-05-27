const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

const spoonacularRoutes = require('./routes/spoonacular');
app.use('/api/spoonacular', spoonacularRoutes);



// Rota teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
