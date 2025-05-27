import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Ingredients from './components/Ingredients'
import RecipeSuggestions from './components/RecipeSuggestions'

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-start p-10">
      <nav className="mb-6 space-x-4">
        <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Registro</Link>
        <Link to="/ingredients" className="text-blue-500 hover:underline">Ingredientes</Link>
        <Link to="/recipes" className="text-blue-500 hover:underline">Receitas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<RecipeSuggestions />} />
      </Routes>
    </div>
  )
}

export default App
