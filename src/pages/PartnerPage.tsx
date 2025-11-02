import { motion } from 'framer-motion';
import { Store, Mail, Phone, MapPin, Building2, Package, Sparkles, Check, ArrowRight, Gift, Heart, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

const BUSINESS_TYPES = [
  { value: 'bakery', label: 'Boulangerie', emoji: '🥖' },
  { value: 'pharmacy', label: 'Pharmacie', emoji: '💊' },
  { value: 'supermarket', label: 'Supermarché', emoji: '🛒' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'other', label: 'Autre', emoji: '🏪' },
];

export default function PartnerPage() {
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
    business_name: '',
    business_type: 'bakery',
    address: '',
    postal_code: '',
    city: '',
    bag_quantity: 100,
  });

  const isNormandyPostalCode = (code: string) => {
    const dept = code.substring(0, 2);
    return NORMANDY_DEPARTMENTS.includes(dept);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (step === 'register' && !isNormandyPostalCode(formData.postal_code)) {
      setError('Le code postal doit être en Normandie (14, 27, 50, 61, 76)');
      setLoading(false);
      return;
    }

    try {
      if (step === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        navigate('/');
      } else {
        const { error: signUpError } = await signUp(
          formData.email,
          formData.password,
          {
            full_name: formData.full_name,
            phone: formData.phone,
            user_type: 'partner'
          }
        );

        if (signUpError) throw signUpError;

        const { data: { user: newUser } } = await supabase.auth.getUser();
        if (!newUser) throw new Error('Erreur lors de la création du compte');

        const { error: partnerError } = await supabase.from('partners').insert({
          user_id: newUser.id,
          business_name: formData.business_name,
          business_type: formData.business_type,
          address: formData.address,
          postal_code: formData.postal_code,
          city: formData.city,
          bag_quantity: formData.bag_quantity,
          status: 'pending'
        });

        if (partnerError) throw partnerError;
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-6">
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
            <Gift className="w-16 h-16 text-purple-600" />
          </motion.div>

          <h2 className="text-5xl font-black mb-6">
            Bienvenue parmi nous ! 🎉
          </h2>
          <p className="text-2xl text-purple-100 mb-8">
            Votre demande a été enregistrée. Nous allons vous contacter sous 48h pour finaliser votre inscription.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Ce qui vous attend :</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-purple-200 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">Validation de votre commerce (48h max)</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-purple-200 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">Première livraison de sacs personnalisés</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-purple-200 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">Badge "Partenaire BagPresto" à afficher</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-purple-200 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">Accès à votre dashboard de distribution</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
          >
            Retour à l'accueil
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const benefits = [
    {
      icon: Gift,
      title: "100% Gratuit",
      description: "Aucun coût, que des avantages"
    },
    {
      icon: Heart,
      title: "Image Valorisée",
      description: "Engagement éco-responsable visible"
    },
    {
      icon: Users,
      title: "Service Apprécié",
      description: "Clients satisfaits et fidélisés"
    },
    {
      icon: TrendingUp,
      title: "Visibilité Accrue",
      description: "Votre logo sur tous les sacs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">BagPresto</h1>
                <p className="text-xs text-purple-600">Espace Partenaire</p>
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
                className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Partenariat 100% gratuit
              </motion.div>

              <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
                Rejoignez notre <span className="text-purple-600">réseau premium</span>
              </h1>

              <p className="text-2xl text-gray-600 leading-relaxed mb-8">
                Distribuez des sacs éco-responsables et valorisez votre engagement environnemental
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
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Join */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Pourquoi nous rejoindre ?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Valorisez votre engagement écologique</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Offrez un service apprécié par vos clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Votre logo sur chaque sac distribué</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Support et suivi personnalisé</span>
                </li>
              </ul>
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
                  <h2 className="text-4xl font-black text-gray-900 mb-3">Bienvenue !</h2>
                  <p className="text-gray-600 mb-8">Commençons par créer votre compte partenaire</p>

                  <div className="space-y-4">
                    <motion.button
                      onClick={() => setStep('register')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-between group"
                    >
                      <span>Créer mon compte partenaire</span>
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
                    className="text-purple-600 hover:text-purple-700 font-medium mb-6 inline-flex items-center gap-2"
                  >
                    ← Retour
                  </button>

                  <h2 className="text-4xl font-black text-gray-900 mb-3">
                    {step === 'register' ? 'Inscription' : 'Connexion'}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {step === 'register'
                      ? 'Quelques informations sur votre commerce'
                      : 'Accédez à votre espace partenaire'}
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
                        <Mail className="w-4 h-4 text-purple-600" />
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                        placeholder="contact@commerce.com"
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
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                        placeholder="••••••••"
                      />
                    </div>

                    {step === 'register' && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Building2 className="w-4 h-4 text-purple-600" />
                              Votre nom
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.full_name}
                              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              placeholder="Jean Dupont"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Phone className="w-4 h-4 text-purple-600" />
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              placeholder="06 12 34 56 78"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <Store className="w-4 h-4 text-purple-600" />
                            Nom du commerce
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.business_name}
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                            placeholder="Ma Boulangerie"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <Store className="w-4 h-4 text-purple-600" />
                            Type de commerce
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {BUSINESS_TYPES.map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, business_type: type.value })}
                                className={`px-4 py-4 rounded-xl border-2 transition-all font-medium ${
                                  formData.business_type === type.value
                                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                              >
                                <span className="text-2xl mr-2">{type.emoji}</span>
                                <span className="text-sm">{type.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            Adresse complète
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="123 Rue de la Paix"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              Code postal
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.postal_code}
                              onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              placeholder="14000"
                              maxLength={5}
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                              <Building2 className="w-4 h-4 text-purple-600" />
                              Ville
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              placeholder="Caen"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                            <Package className="w-4 h-4 text-purple-600" />
                            Quantité de sacs par mois
                          </label>
                          <input
                            type="number"
                            required
                            min="50"
                            step="50"
                            value={formData.bag_quantity}
                            onChange={(e) => setFormData({ ...formData, bag_quantity: parseInt(e.target.value) })}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                            placeholder="100"
                          />
                        </div>
                      </>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
