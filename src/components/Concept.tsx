import { motion } from 'framer-motion';
import { Building2, Printer, Store } from 'lucide-react';

export default function Concept() {
  const steps = [
    {
      icon: Building2,
      title: "Entreprises réservent",
      description: "Les entreprises locales réservent leur espace publicitaire sur nos sacs réutilisables",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Printer,
      title: "Impression éco-responsable",
      description: "Nous imprimons des sacs de qualité avec 12 publicités (6 par face) + le logo du partenaire",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Store,
      title: "Distribution gratuite",
      description: "Les commerces partenaires distribuent gratuitement les sacs à leurs clients",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Le concept <span className="text-emerald-600">BagPresto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution publicitaire innovante qui profite à tous : entreprises locales,
            commerces partenaires et l'environnement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-gray-200">{index + 1}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>

                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-4">Pourquoi BagPresto ?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-emerald-100">Éco-responsable</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-emerald-100">Publicités par sac</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Local</div>
              <div className="text-emerald-100">Normandie uniquement</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
