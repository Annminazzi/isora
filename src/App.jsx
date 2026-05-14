import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import HubLayout from './components/HubLayout';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState('visitor'); // 'visitor', 'pending', 'standard', 'premium', 'admin'
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole('visitor');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        // Si le profil n'existe pas encore (ex: trigger n'a pas fini), on set pending par défaut
        console.error('Profil non trouvé, attribution du rôle pending.');
        setUserRole('pending');
      } else if (data) {
        setUserRole(data.role);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle:', error);
      setUserRole('pending');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)', color: 'var(--color-gold)' }}>
        <p>Chargement d'Isora...</p>
      </div>
    );
  }

  return (
    <>
      {showAuthModal && (
        <Auth onClose={() => setShowAuthModal(false)} />
      )}
      {showAdminModal && userRole === 'admin' && (
        <AdminDashboard onClose={() => setShowAdminModal(false)} />
      )}
      <HubLayout 
        user={session?.user} 
        role={userRole} 
        onOpenAuth={() => setShowAuthModal(true)} 
        onOpenAdmin={() => setShowAdminModal(true)}
      />
    </>
  );
}

export default App;
