-- 1. Créer la table 'profiles' pour stocker les rôles et autres infos
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Activer RLS (Row Level Security) sur la table 'profiles'
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Politique 1 : Tout le monde (y compris les visiteurs) peut lire les profils (pour que l'app sache qui est admin/premium)
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

-- 4. Politique 2 : L'Admin peut tout modifier
-- (Seules les requêtes serveur avec Service Role Key ou un utilisateur avec le rôle 'admin' peuvent modifier)
CREATE POLICY "Admins can update all profiles."
  ON profiles FOR UPDATE
  USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' );

CREATE POLICY "Admins can delete all profiles."
  ON profiles FOR DELETE
  USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' );


-- 5. Créer la fonction Trigger qui se déclenche lors d'une inscription (insert sur auth.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'pending');
  RETURN new;
END;
$$;

-- 6. Attacher le Trigger à la table système d'authentification
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- FACULTATIF : Si vous êtes déjà inscrit en tant qu'admin, exécutez cette commande 
-- en remplaçant 'votre-email@exemple.com' par votre adresse mail pour vous donner les droits Admin immédiatement !
-- (À exécuter APRÈS que vous vous soyez inscrit sur l'application web pour la première fois)
-- UPDATE profiles SET role = 'admin' WHERE email = 'votre-email@exemple.com';
