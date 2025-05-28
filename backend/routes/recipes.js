const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { fetch } = require('undici');

// Sugestão de receitas com base nos ingredientes e filtros
router.get('/suggest', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ingredients = user.ingredients.filter(Boolean).join(',');

    const { diet, intolerances } = req.query;

    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    if (diet) {
      url += `&diet=${encodeURIComponent(diet)}`;
    }
    if (intolerances) {
      url += `&intolerances=${encodeURIComponent(intolerances)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar receitas:", err.message);
    res.status(500).send('Erro ao buscar receitas');
  }
});

// 🔽 ROTA NOVA: Buscar detalhes da receita por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      return res.status(404).json({ msg: 'Receita não encontrada' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar detalhes da receita:", err.message);
    res.status(500).send('Erro ao buscar detalhes da receita');
  }
});

module.exports = router;
