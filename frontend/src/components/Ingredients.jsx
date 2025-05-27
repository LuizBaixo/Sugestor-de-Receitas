import { useState, useEffect } from 'react';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchIngredients();
  }, []);

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Ingredientes</h2>

      {/* Input de busca/autocomplete */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full border p-2 rounded mb-2"
        placeholder="Digite para buscar ingrediente"
      />

      {/* Lista de sugestões */}
      {suggestions.length > 0 && (
        <ul className="border rounded mb-4">
          {suggestions.map((sug) => (
            <li
              key={sug.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAdd(sug.name)}
            >
              {sug.name}
            </li>
          ))}
        </ul>
      )}

      {/* Lista de ingredientes adicionados */}
      <ul className="mb-4">
        {ingredients.map((ing, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{ing}</span>
            <button
              onClick={() => handleRemove(ing)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {message && <div className="mt-4 text-blue-500">{message}</div>}
    </div>
  );
}

export default Ingredients;
