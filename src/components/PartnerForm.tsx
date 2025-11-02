import { motion } from 'framer-motion';
import { X, Store, Mail, Phone, MapPin, Building2, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface PartnerFormProps {
  onClose: () => void;
}

const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

const BUSINESS_TYPES = [
  { value: 'bakery', label: 'Boulangerie' },
  { value: 'pharmacy', label: 'Pharmacie' },
  { value: 'supermarket', label: 'Supermarché' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'other', label: 'Autre' },
];

export default function PartnerForm({ onClose }: PartnerFormProps) {
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        onClose();
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
        if (!newUser) throw new Error('User creation failed');

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
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-t-3xl flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {isLogin ? 'Connexion Partenaire' : 'Devenir Partenaire'}
            </h2>
            <p className="text-purple-100 mt-1">
              {isLogin ? 'Accédez à votre espace partenaire' : 'Distribuez nos sacs éco-responsables'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
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
                <span>Mot de passe</span>
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
                <select
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
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
                  Quantité de sacs souhaitée
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-600/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </button>

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
    </motion.div>
  );
}
