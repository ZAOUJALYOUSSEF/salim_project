// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    phone?: string;
    user_type: 'client' | 'partner' | 'admin';
  };
}

interface Session {
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, metadata: { full_name: string; phone?: string; user_type: 'client' | 'partner' | 'admin' }) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string, userType?: 'client' | 'partner' | 'admin') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setSession({ user: userData });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (email: string, password: string, metadata: { full_name: string; phone?: string; user_type: 'client' | 'partner' | 'admin' }) => {
    try {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: metadata
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', 'demo_token_' + Date.now());

      setUser(newUser);
      setSession({ user: newUser });

      return { data: { user: newUser }, error: null };
    } catch (error) {
      console.error('Unexpected error in signUp:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string, userType: 'client' | 'partner' | 'admin' = 'client') => {
    try {
      // Vérifier les identifiants admin
      if (email === 'prof@demo.com' && password === '12345678') {
        const adminUser: User = {
          id: 'admin-001',
          email: 'prof@demo.com',
          user_metadata: {
            full_name: 'Administrateur',
            user_type: 'admin'
          }
        };

        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('auth_token', 'admin_token_' + Date.now());

        setUser(adminUser);
        setSession({ user: adminUser });

        return { error: null };
      }

      // Pour les autres utilisateurs
      if (email && password) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          user_metadata: {
            full_name: userType === 'partner' ? 'Partenaire Demo' : 'Client Demo',
            user_type: userType
          }
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('auth_token', 'demo_token_' + Date.now());

        setUser(user);
        setSession({ user: user });

        return { error: null };
      } else {
        return { error: { message: 'Email et mot de passe requis' } };
      }
    } catch (error) {
      console.error('Unexpected error in signIn:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('partner_data');
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}