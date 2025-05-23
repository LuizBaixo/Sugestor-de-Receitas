const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String
  }],
  favorites: [{
    type: Object
  }]
});

module.exports = mongoose.model('User', UserSchema);


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Listar ingredientes
router.get('/ingredients', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.ingredients);
});

// Adicionar ingrediente
router.post('/ingredients', auth, async (req, res) => {
  const { ingredient } = req.body;
  const user = await User.findById(req.user.id);
  user.ingredients.push(ingredient);
  await user.save();
  res.json(user.ingredients);
});

// Remover ingrediente
router.delete('/ingredients/:ingredient', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.ingredients = user.ingredients.filter(i => i !== req.params.ingredient);
  await user.save();
  res.json(user.ingredients);
});

// Listar favoritos
router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.favorites);
});

// Adicionar favorito
router.post('/favorites', auth, async (req, res) => {
  const { recipe } = req.body;
  const user = await User.findById(req.user.id);
  user.favorites.push(recipe);
  await user.save();
  res.json(user.favorites);
});

// Remover favorito
router.delete('/favorites/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites = user.favorites.filter(f => f.id !== req.params.id);
  await user.save();
  res.json(user.favorites);
});

module.exports = router;
