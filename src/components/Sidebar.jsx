import { supabase } from '../lib/supabase';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose, user, role, onOpenAdmin }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getRoleDisplay = () => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'premium': return 'Compte Premium';
      case 'standard': return 'Compte Standard';
      case 'pending': return 'Compte en attente';
      default: return 'Visiteur';
    }
  };

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose}
      />
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.header}>
            <button className={styles.closeBtn} onClick={onClose}>
              <div className={styles.hamburgerLine}></div>
              <div className={styles.hamburgerLine}></div>
              <div className={styles.hamburgerLine}></div>
            </button>
          </div>

          {user && (
            <div className={styles.accountSection}>
              <h2 className={styles.sectionTitle}>Statut du compte</h2>
              <div className={styles.accountStatus}>{getRoleDisplay()}</div>
              <div className={styles.userName}>{user.email}</div>
            </div>
          )}
          
          <div className={styles.menuSection}>
            {role === 'admin' && (
              <button 
                className={styles.menuBtn}
                onClick={() => {
                  onClose();
                  if (onOpenAdmin) onOpenAdmin();
                }}
              >
                Gestion des Utilisateurs
              </button>
            )}
          </div>

          <div className={styles.footer}>
            {user && (
              <button className={styles.logoutBtn} onClick={handleSignOut}>
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
