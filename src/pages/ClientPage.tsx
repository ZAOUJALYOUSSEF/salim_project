// pages/ClientPage.tsx
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Briefcase, MessageSquare, Sparkles, Check, ArrowRight, TrendingUp, Target, Zap, Award } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

export default function ClientPage() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [step, setStep] = useState<'choice' | 'register' | 'login'>('choice');
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

    // Validation
    if (step === 'register') {
      if (!isNormandyPostalCode(formData.postal_code)) {
        setError('Le code postal doit être en Normandie (14, 27, 50, 61, 76)');
        setLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        setLoading(false);
        return;
      }
    }

    try {
      if (step === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        navigate('/dashboard');
      } else {
        console.log('Starting registration process...');
        
        // Utiliser le contexte d'authentification
        const { data: authData, error: signUpError } = await signUp(
          formData.email,
          formData.password,
          {
            full_name: formData.full_name,
            phone: formData.phone,
            user_type: 'client'
          }
        );

        if (signUpError) {
          console.error('SignUp error:', signUpError);
          throw signUpError;
        }

        if (!authData?.user) {
          throw new Error('Erreur lors de la création du compte utilisateur');
        }

        console.log('Client registration successful');
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Messages d'erreur plus user-friendly
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (err.message?.includes('Failed to fetch')) {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
      } else if (err.message?.includes('User already registered')) {
        errorMessage = 'Un compte avec cet email existe déjà.';
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe incorrect.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl text-center text-white"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 1 }}
            className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Check className="w-16 h-16 text-emerald-600" />
          </motion.div>

          <h2 className="text-5xl font-black mb-6">
            Bienvenue chez BagPresto ! 🎉
          </h2>
          <p className="text-2xl text-emerald-100 mb-8">
            Votre compte a été créé avec succès. Notre équipe va valider votre inscription dans les 24h.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Prochaines étapes :</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 text-sm font-bold">1</span>
                </div>
                <p className="text-emerald-100">Vérification de votre dossier par notre équipe (24h)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 text-sm font-bold">2</span>
                </div>
                <p className="text-emerald-100">Accès à votre dashboard client et outils analytics</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 text-sm font-bold">3</span>
                </div>
                <p className="text-emerald-100">Lancement de votre première campagne publicitaire</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-emerald-600 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
          >
            Retour à l'accueil
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "ROI Garanti +250%",
      description: "Visibilité maximale, résultats mesurables"
    },
    {
      icon: Target,
      title: "Ciblage Ultra-Précis",
      description: "Atteignez exactement votre clientèle"
    },
    {
      icon: Zap,
      title: "Déploiement Rapide",
      description: "Campagne active en 2-3 semaines"
    },
    {
      icon: Award,
      title: "Support Premium",
      description: "Accompagnement personnalisé"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">BagPresto</h1>
                <p className="text-xs text-emerald-600">Espace Client</p>
              </div>
            </motion.button>

            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Retour
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                500+ entreprises nous font confiance
              </motion.div>

              <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
                Lancez votre <span className="text-emerald-600">campagne</span> en 5 min
              </h1>

              <p className="text-2xl text-gray-600 leading-relaxed mb-8">
                Rejoignez les entreprises qui dominent leur marché local grâce à BagPresto
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 text-white">
              <div className="text-sm font-semibold mb-4 text-emerald-200">CE QU'ILS DISENT</div>
              <p className="text-xl italic mb-4">
                "BagPresto a transformé notre visibilité. Notre CA a augmenté de 45% en 3 mois !"
              </p>
              <div className="flex items-center gap-3">
                <div className="text-4xl">👨‍🍳</div>
                <div>
                  <div className="font-bold">Jean-Pierre Martin</div>
                  <div className="text-emerald-200 text-sm">Restaurant Le Goût Normand, Rouen</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-6 self-start"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {step === 'choice' && (
                <div className="p-10">
                  <h2 className="text-4xl font-black text-gray-900 mb-3">Commençons !</h2>
                  <p className="text-gray-600 mb-8">Vous avez déjà un compte ou c'est votre première fois ?</p>

                  <div className="space-y-4">
                    <motion.button
                      onClick={() => setStep('register')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-between group"
                    >
                      <span>Créer mon compte</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </motion.button>

                    <motion.button
                      onClick={() => setStep('login')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-6 bg-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-between group"
                    >
                      <span>J'ai déjà un compte</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              )}

              {(step === 'register' || step === 'login') && (
                <form onSubmit={handleSubmit} className="p-10">
                  <button
                    type="button"
                    onClick={() => setStep('choice')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-flex items-center gap-2"
                  >
                    ← Retour
                  </button>

                  <h2 className="text-4xl font-black text-gray-900 mb-3">
                    {step === 'register' ? 'Créer mon compte' : 'Connexion'}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {step === 'register'
                      ? 'Quelques informations pour démarrer'
                      : 'Accédez à votre espace client'}
                  </p>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        Email professionnel
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
                        placeholder="contact@entreprise.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
                        placeholder="••••••••"
                        minLength={6}
                      />
                      {step === 'register' && (
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
                      )}
                    </div>

                    {step === 'register' && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Building2 className="w-4 h-4 text-emerald-600" />
                              Votre nom
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.full_name}
                              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder="Jean Dupont"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Phone className="w-4 h-4 text-emerald-600" />
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder="06 12 34 56 78"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            Nom de votre entreprise
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company_name}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
                            placeholder="Mon Entreprise SAS"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Briefcase className="w-4 h-4 text-emerald-600" />
                              Secteur d'activité
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.sector}
                              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder="ex: Restaurant"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <MapPin className="w-4 h-4 text-emerald-600" />
                              Code postal
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.postal_code}
                              onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder="14000"
                              maxLength={5}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <MessageSquare className="w-4 h-4 text-emerald-600" />
                            Votre message publicitaire (optionnel)
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            rows={3}
                            placeholder="ex: Venez découvrir nos produits locaux..."
                          />
                        </div>
                      </>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          {step === 'register' ? 'Créer mon compte' : 'Se connecter'}
                          <ArrowRight className="w-6 h-6" />
                        </>
                      )}
                    </motion.button>

                    {step === 'register' && (
                      <p className="text-center text-sm text-gray-500 mt-4">
                        En créant un compte, vous acceptez nos conditions d'utilisation
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}