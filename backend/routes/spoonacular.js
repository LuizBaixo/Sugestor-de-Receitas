const express = require('express');
const router = express.Router();

const SPOONACULAR_API_KEY = 'eef0fa219cfa423ea5a4f5c4015c18ee';

// GET /api/spoonacular/ingredients?query=a&number=10
router.get('/ingredients', async (req, res) => {
  const { query, number = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ msg: 'Parâmetro "query" é obrigatório.' });
  }

  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(query)}&number=${number}&apiKey=${SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(url);  // ✅ Use direto!
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao consultar Spoonacular.' });
  }
});

module.exports = router;
