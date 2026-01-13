import React, { useState, FormEvent } from 'react';
import { en } from '../translations/en';
import { es } from '../translations/es';

type Language = 'en' | 'es';

interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
  };
}

const Login: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const translations = language === 'en' ? en : es;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Client-side validation
    if (!username.trim()) {
      setError(translations.usernameRequired);
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError(translations.passwordRequired);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          language: language,
        }),
      });

      const data: LoginResponse = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setUsername('');
        setPassword('');
        // You can redirect or update app state here
        console.log('Logged in user:', data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(
        language === 'en'
          ? 'Network error. Please try again.'
          : 'Error de red. Por favor intente de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{translations.login}</h1>

        {/* Language Selector */}
        <div style={styles.languageSelector}>
          <label style={styles.languageLabel}>{translations.language}: </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as Language);
              setError('');
              setSuccess('');
            }}
            style={styles.select}
          >
            <option value="en">{translations.english}</option>
            <option value="es">{translations.spanish}</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>{translations.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{translations.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? translations.loading : translations.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  languageSelector: {
    marginBottom: '1.5rem',
    textAlign: 'right',
  },
  languageLabel: {
    marginRight: '0.5rem',
    color: '#666',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '1rem',
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #f5c6cb',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #c3e6cb',
  },
};

export default Login;
