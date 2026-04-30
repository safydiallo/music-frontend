import { useState, useContext } from 'react';
import { login } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (err) {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Mot de passe" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}