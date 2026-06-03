import { Loader2, UserPlus } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/recommendation');
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="form-icon">
          <UserPlus size={24} />
        </div>
        <h1>Create account</h1>
        <p>Save your profile and start discovering curated places.</p>

        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required minLength={2} />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" required minLength={6} />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="primary-button full" type="submit" disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : <UserPlus size={18} />}
          Register
        </button>

        <span className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </span>
      </form>
    </section>
  );
}
