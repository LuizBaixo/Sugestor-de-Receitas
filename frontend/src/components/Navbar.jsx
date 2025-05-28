import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Login' },
    { to: '/register', label: 'Registro' },
    { to: '/ingredients', label: 'Ingredientes' },
    { to: '/recipes', label: 'Receitas' },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md w-full flex justify-center">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`px-3 py-2 rounded hover:bg-gray-700 transition ${
                location.pathname === item.to ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
