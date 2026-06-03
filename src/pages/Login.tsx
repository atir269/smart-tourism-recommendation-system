import { Loader2, LogIn } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/recommendation');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="form-icon">
          <LogIn size={24} />
        </div>
        <h1>Welcome back</h1>
        <p>Sign in to continue planning your next trip.</p>

        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" required />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="primary-button full" type="submit" disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : <LogIn size={18} />}
          Login
        </button>

        <span className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </span>
      </form>
    </section>
  );
}
