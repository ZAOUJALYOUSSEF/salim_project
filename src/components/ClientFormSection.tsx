import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Briefcase, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

// Mock authentication functions
const mockSignUp = async (email: string, password: string, userData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        error: null, 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: email 
          } 
        } 
      });
    }, 1000);
  });
};

const mockSignIn = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ error: null });
    }, 1000);
  });
};

export default function ClientFormSection() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    company_name: '',
    sector: '',
    postal_code: '',
    message: '',
  });

  const isNormandyPostalCode = (code: string) => {
    const dept = code.substring(0, 2);
    return NORMANDY_DEPARTMENTS.includes(dept);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && !isNormandyPostalCode(formData.postal_code)) {
      setError('Le code postal doit être en Normandie (14, 27, 50, 61, 76)');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await mockSignIn(formData.email, formData.password);
        if (error) throw error;
        setSuccess(true);
      } else {
        const { error: signUpError } = await mockSignUp(
          formData.email,
          formData.password,
          {
            full_name: formData.full_name,
            phone: formData.phone,
            user_type: 'client'
          }
        );

        if (signUpError) throw signUpError;

        // Mock client creation
        const mockClientData = {
          user_id: 'mock-user-id',
          company_name: formData.company_name,
          sector: formData.sector,
          postal_code: formData.postal_code,
          message: formData.message,
          status: 'pending'
        };

        console.log('Client created:', mockClientData);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="clients" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-500 to-blue-600 py-24 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl text-center text-white"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-12 h-12 text-emerald-600" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? 'Connexion réussie !' : 'Inscription réussie !'}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {isLogin
              ? 'Vous allez être redirigé vers votre espace client...'
              : 'Votre compte a été créé avec succès. Notre équipe va valider votre inscription dans les 24h.'}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="clients" className="min-h-screen py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Espace Annonceur
              </motion.div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Faites rayonner votre <span className="text-emerald-600">entreprise</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rejoignez les centaines d'entreprises normandes qui boostent leur visibilité locale avec BagPresto.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: TrendingUp, title: 'Visibilité maximale', desc: '+250% de notoriété locale en moyenne' },
                { icon: Users, title: 'Ciblage précis', desc: 'Atteignez vos clients dans toute la Normandie' },
                { icon: Sparkles, title: 'Éco-responsable', desc: '100% recyclé et biodégradable' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Connexion' : 'Créer mon compte annonceur'}
              </h3>
              <p className="text-gray-600">
                {isLogin ? 'Accédez à votre espace client' : 'Commencez votre première campagne'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Mon Entreprise"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                        Secteur d'activité
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Restaurant, Commerce..."
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Code postal
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postal_code}
                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="14000"
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      Message publicitaire
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Votre message publicitaire..."
                    />
                  </div>
                </>
              )}

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-emerald-600/30 transition-all disabled:opacity-50"
                >
                  {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full mt-3 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}