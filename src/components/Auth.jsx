import { useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './Auth.module.css';

export default function Auth({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Inscription réussie ! Votre compte est en attente de validation.');
        if (onClose) onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (onClose) onClose();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        )}
        <div className={styles.logoContainer}>
          <div className={styles.logoEmblem}>
            <svg viewBox="0 0 100 100" className={styles.gear}>
              <path fill="currentColor" d="M50 10A40 40 0 1 0 50 90A40 40 0 1 0 50 10ZM50 80A30 30 0 1 1 50 20A30 30 0 1 1 50 80Z" />
              {[...Array(12)].map((_, i) => (
                <rect key={i} x="46" y="0" width="8" height="15" fill="currentColor" transform={`rotate(${i * 30} 50 50)`} />
              ))}
            </svg>
            <div className={styles.fleurDeLys}>⚜</div>
          </div>
          <h1 className={styles.title}>ISORA</h1>
          <div className={styles.divider}></div>
        </div>

        <form onSubmit={handleAuth} className={styles.form}>
          <h2 className={styles.subtitle}>{isSignUp ? 'Créer un compte' : 'Connexion'}</h2>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Chargement...' : isSignUp ? "S'inscrire" : 'Se connecter'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isSignUp ? 'Déjà un compte ?' : "Pas encore de compte ?"}
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
}
