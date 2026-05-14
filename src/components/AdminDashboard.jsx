import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) setError(error.message);
    else setUsers(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      alert("Erreur lors de la mise à jour: " + error.message);
    } else {
      // Met à jour l'état local pour éviter un rechargement complet
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };

  return (
    <div className={styles.dashboardOverlay}>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gestion des Utilisateurs</h2>
          <div>
            <button className={styles.refreshBtn} onClick={fetchUsers}>Actualiser</button>
            <button className={styles.closeBtn} onClick={onClose}>Fermer</button>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.tableContainer}>
          {loading ? (
            <p className={styles.loading}>Chargement des utilisateurs...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Date d'inscription</th>
                  <th>Rôle / Accès</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={user.role === 'pending' ? styles.rowPending : ''}>
                    <td>{user.email}</td>
                    <td>{user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className={`${styles.roleSelect} ${styles['role_' + user.role]}`}
                      >
                        <option value="pending" className={styles.optPending}>En attente</option>
                        <option value="standard" className={styles.optGreen}>Standard</option>
                        <option value="premium" className={styles.optGreen}>Premium</option>
                        <option value="admin" className={styles.optGreen}>Admin</option>
                        <option value="banned" className={styles.optBanned}>Bloqué</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => {
                          if (window.confirm(`Supprimer l'accès pour ${user.email} ?`)) {
                            updateRole(user.id, 'banned');
                          }
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {(!users || users.length === 0) && (
                  <tr>
                    <td colSpan="4" className={styles.empty}>Aucun utilisateur trouvé.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
