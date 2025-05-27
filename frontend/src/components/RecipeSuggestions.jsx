import { useState } from 'react';

function RecipeSuggestions() {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchRecipes = async () => {
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/recipes/suggest', {
        headers: { 'x-auth-token': token },
      });

      const data = await response.json();

      if (response.ok) {
        setRecipes(data);
      } else {
        setMessage(data.msg || 'Erro ao buscar receitas.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sugestões de Receitas</h2>
      <button
        onClick={fetchRecipes}
        className="mb-4 bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
      >
        Buscar Receitas
      </button>

      {message && <div className="text-red-500">{message}</div>}

      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mt-2"
            />
            <div className="mt-2">
              <strong>Ingredientes que você tem:</strong>
              <ul className="list-disc ml-6">
                {recipe.usedIngredients.map((ing) => (
                  <li key={ing.id}>{ing.name}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <strong>Ingredientes que faltam:</strong>
              <ul className="list-disc ml-6">
                {recipe.missedIngredients.map((ing) => (
                  <li key={ing.id}>{ing.name}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeSuggestions;
