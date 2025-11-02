import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown } from 'lucide-react';

interface PricingProps {
  onGetStarted: () => void;
}

export default function Pricing({ onGetStarted }: PricingProps) {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "149",
      period: "campagne",
      description: "Parfait pour tester BagPresto",
      color: "from-blue-500 to-blue-600",
      features: [
        "500 sacs distribués",
        "1 emplacement publicitaire",
        "3 mois de campagne",
        "Zone de distribution locale",
        "Rapport mensuel",
        "Support email"
      ],
      popular: false
    },
    {
      name: "Business",
      icon: Star,
      price: "399",
      period: "campagne",
      description: "Le plus populaire pour PME",
      color: "from-emerald-500 to-emerald-600",
      features: [
        "2000 sacs distribués",
        "3 emplacements publicitaires",
        "6 mois de campagne",
        "Zone département entier",
        "Rapports hebdomadaires",
        "Support prioritaire",
        "Analytics détaillés",
        "Badge partenaire premium"
      ],
      popular: true
    },
    {
      name: "Premium",
      icon: Crown,
      price: "899",
      period: "campagne",
      description: "Pour une visibilité maximale",
      color: "from-purple-500 to-purple-600",
      features: [
        "5000+ sacs distribués",
        "6 emplacements publicitaires",
        "12 mois de campagne",
        "Toute la Normandie",
        "Rapports en temps réel",
        "Account manager dédié",
        "Analytics avancés",
        "Design personnalisé",
        "Campagnes prioritaires",
        "Réunions stratégiques"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-4 h-4 fill-current" />
            Tarifs transparents
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choisissez votre <span className="text-emerald-600">formule</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prix clairs, sans frais cachés. Payez uniquement pour ce dont vous avez besoin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-4 ring-emerald-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm">
                  ⭐ Populaire
                </div>
              )}

              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}€</span>
                    <span className="text-gray-600 mb-2">/ {plan.period}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Commencer maintenant
                </motion.button>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-6 h-6 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'une solution sur mesure ?
          </h3>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Nous créons des packages personnalisés pour les grandes entreprises et les campagnes d'envergure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Demander un devis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20"
            >
              Nous contacter
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
