import { useState, useEffect } from 'react';

function RecipeSuggestions() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes/suggest', {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRecipes(data || []);
      } else {
        setError(data.msg || 'Erro ao buscar receitas.');
      }
    } catch {
      setError('Erro de conexão com o servidor.');
    }
  };

  const fetchRecipeDetails = async (id) => {
    setModalLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedRecipe(data);
      } else {
        setError(data.msg || 'Erro ao carregar detalhes da receita.');
      }
    } catch {
      setError('Erro ao conectar ao servidor.');
    }
    setModalLoading(false);
  };

  const handleRecipeClick = (id) => {
    fetchRecipeDetails(id);
  };

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Sugestões de Receitas</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-700 transition"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
            <button
              className="text-white text-xl float-right mb-4"
              onClick={closeModal}
            >
              ×
            </button>

            {modalLoading ? (
              <p className="text-center">Carregando detalhes...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-60 object-cover rounded mb-4"
                />
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Ingredientes:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.extendedIngredients?.map((ing) => (
                      <li key={ing.id}>{ing.original}</li>
                    ))}
                  </ul>
                </div>
                {selectedRecipe.analyzedInstructions?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Modo de preparo:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                        <li key={step.number}>{step.step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeSuggestions;
