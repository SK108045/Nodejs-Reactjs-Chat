import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const AuthPage = (props) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.username.value.trim();

    if (!value) {
      setError('Please enter a username.');
      return;
    }

    setError('');
    setLoading(true);
    axios
      .post(`${API_URL}/authenticate`, { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((err) => {
        console.log('error', err);
        setError('Could not sign in. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Pick a username to start chatting</div>
        <div className="auth">
          <label className="auth-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="auth-input"
            name="username"
            placeholder="e.g. victor"
            autoComplete="off"
            autoFocus
          />
          <div className="auth-error" role="alert">
            {error}
          </div>
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Enter'}
          </button>
        </div>
      </form>
    </div>
  );
};

AuthPage.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

export default AuthPage;
