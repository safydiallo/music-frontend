import { useState } from 'react';
import { register } from '../api/authApi';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || 'Erreur');
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom complet" onChange={e => setForm({...form, fullName: e.target.value})} />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Mot de passe" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}