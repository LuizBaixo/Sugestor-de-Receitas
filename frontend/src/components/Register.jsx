import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registro realizado com sucesso!');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.msg || 'Erro ao registrar.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-4">
      <div className="bg-[#1e293b] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#334155] border border-[#475569] rounded text-white placeholder-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 bg-[#334155] border border-[#475569] rounded text-white placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 px-4 rounded"
          >
            Registrar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-blue-400">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
