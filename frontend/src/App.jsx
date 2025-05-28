import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Ingredients from './components/Ingredients';
import RecipeSuggestions from './components/RecipeSuggestions';

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-5xl">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/recipes" element={<RecipeSuggestions />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
