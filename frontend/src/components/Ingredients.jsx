import { useState, useEffect } from 'react';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [ingredientImages, setIngredientImages] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchImagesForIngredients(ingredients);
    }
  }, [ingredients]);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/ingredients', {
        headers: { 'x-auth-token': token },
      });
      const data = await response.json();
      if (response.ok) {
        setIngredients(data || []);
      } else {
        setMessage(data.msg || 'Erro ao carregar ingredientes.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    }
  };

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/spoonacular/ingredients?query=${input}&number=5`);
      const data = await response.json();
      setSuggestions(data || []);
    } catch {
      console.error('Erro ao buscar sugestões');
    }
  };

  const fetchImagesForIngredients = async (list) => {
    const newImages = {};
    for (const name of list) {
      try {
        const response = await fetch(`http://localhost:5000/api/spoonacular/ingredients?query=${name}&number=1`);
        const data = await response.json();
        if (data && data.length > 0) {
          newImages[name] = `https://spoonacular.com/cdn/ingredients_100x100/${data[0].image}`;
        }
      } catch {
        console.error(`Erro ao buscar imagem para ${name}`);
      }
    }
    setIngredientImages(newImages);
  };

  const handleAdd = async (ingredient) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ ingredient }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Ingrediente adicionado!');
        setQuery('');
        setSuggestions([]);
        fetchIngredients();
      } else {
        setMessage(data.msg || 'Erro ao adicionar ingrediente.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    }
  };

  const handleRemove = async (ingredient) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/ingredients/${ingredient}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token },
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Ingrediente removido!');
        fetchIngredients();
      } else {
        setMessage(data.msg || 'Erro ao remover ingrediente.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Gerenciar Ingredientes</h2>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Digite para buscar ingrediente"
          className="w-full border border-gray-700 bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
            {suggestions.map((sug) => (
              <li
                key={sug.id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700"
                onMouseDown={() => handleAdd(sug.name)}
              >
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${sug.image}`}
                  alt={sug.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="capitalize">{sug.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-4">Ingredientes adicionados:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ingredients.map((ing) => (
          <div
            key={ing}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center"
          >
            <img
              src={
                ingredientImages[ing]
                  ? ingredientImages[ing]
                  : 'https://spoonacular.com/cdn/ingredients_100x100/unknown.png'
              }
              alt={ing}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <p className="capitalize font-medium mb-3">{ing}</p>
            <button
              onClick={() => handleRemove(ing)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      {message && <div className="mt-6 text-center text-blue-400">{message}</div>}
    </div>
  );
}

export default Ingredients;
