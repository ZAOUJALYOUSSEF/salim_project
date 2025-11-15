import { motion } from 'framer-motion';
import { Store, Mail, Phone, MapPin, Building2, Package, Sparkles, Gift, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

const BUSINESS_TYPES = [
  { value: 'bakery', label: 'Boulangerie', emoji: '🥖' },
  { value: 'pharmacy', label: 'Pharmacie', emoji: '💊' },
  { value: 'supermarket', label: 'Supermarché', emoji: '🛒' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'other', label: 'Autre', emoji: '🏪' },
];

export default function PartnerFormSection() {
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
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

    if (!isLogin && !isNormandyPostalCode(formData.postal_code)) {
      setError('Le code postal doit être en Normandie (14, 27, 50, 61, 76)');
      setLoading(false);
      return;
    }

    try {
      // Simulation de l'inscription/connexion
      setTimeout(() => {
        if (isLogin) {
          console.log('Connexion simulée:', formData.email);
        } else {
          console.log('Inscription simulée:', formData);
        }
        setSuccess(true);
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="partners" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 py-24 px-6">
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
            <Gift className="w-12 h-12 text-purple-600" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? 'Connexion réussie !' : 'Bienvenue parmi nous !'}
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            {isLogin
              ? 'Vous allez être redirigé vers votre espace partenaire...'
              : 'Votre demande a été enregistrée. Nous allons vous contacter sous 48h pour finaliser votre inscription.'}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="partners" className="min-h-screen py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
                className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Store className="w-4 h-4" />
                Espace Partenaire
              </motion.div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Devenez partenaire <span className="text-purple-600">BagPresto</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rejoignez notre réseau de commerces engagés pour l'environnement et offrez un service apprécié à vos clients.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Gift, title: '100% Gratuit', desc: 'Aucun coût, que des avantages pour votre commerce' },
                { icon: Heart, title: 'Image valorisée', desc: 'Montrez votre engagement éco-responsable' },
                { icon: Sparkles, title: 'Service apprécié', desc: 'Vos clients adorent les sacs réutilisables' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                {isLogin ? 'Connexion' : 'Devenir partenaire'}
              </h3>
              <p className="text-gray-600">
                {isLogin ? 'Accédez à votre espace partenaire' : 'Rejoignez notre réseau dès aujourd\'hui'}
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
                    <Mail className="w-4 h-4 text-purple-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-purple-600" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Store className="w-4 h-4 text-purple-600" />
                      Nom du commerce
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Ma Boulangerie"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Store className="w-4 h-4 text-purple-600" />
                      Type de commerce
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUSINESS_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, business_type: type.value })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all ${
                            formData.business_type === type.value
                              ? 'border-purple-600 bg-purple-50 text-purple-900'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <span className="mr-2">{type.emoji}</span>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      Adresse complète
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="123 Rue de la Paix"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        Code postal
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postal_code}
                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="14000"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        Ville
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Caen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      Quantité de sacs souhaitée (par mois)
                    </label>
                    <input
                      type="number"
                      required
                      min="50"
                      step="50"
                      value={formData.bag_quantity}
                      onChange={(e) => setFormData({ ...formData, bag_quantity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="100"
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
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-600/30 transition-all disabled:opacity-50"
                >
                  {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full mt-3 text-purple-600 hover:text-purple-700 font-medium"
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