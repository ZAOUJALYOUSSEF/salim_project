import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment fonctionne BagPresto ?",
      answer: "BagPresto connecpublicités (6 par face) plus le logo du commerce distributeur. C'est une solution gagnant-gagnant : les entreprises gagnent en visibilité, les commerces valorisent leur engagement éco-responsable, et l'environnement est préservé."
    },
    {
      question: "Quels sont les départements couverts ?",
      answer: "Nous couvrons l'ensemble de la Normandie : Calvados (14), Eure (27), Manche (50), Orne (61) et Seine-Maritime (76). Notre réseau de partenaires s'étend dans toutes les villes principales et zones rurales de la région."
    },
    {
      question: "Combien coûte une campagne publicitaire ?",
      answer: "Nos forfaits commence avec une couverture régionale complète. Nous proposons également des solutions sur mesure pour les besoins spécifiques."
    },
    {
      question: "Comment devenir commerce partenaire ?",
      answer: "C'est simple et gratuit ! Inscrivez-vous via notre formulaire partenaire, indiquez votre type de commerce et la quantité de sacs que vous pouvez distribuer. Après validation de votre dossier, vous recevrez vos premiers sacs sous 2 semaines. Vous valorisez ainsi votre engagement écologique tout en offrant un service apprécié à vos clients."
    },
    {
      question: "Les sacs sont-ils vraiment éco-responsables ?",
      answer: "Absolument ! Nos sacs sont fabriqués à partir de matériaux 100% recyclés et sont eux-mêmes recyclables et biodégradables. Ils sont conçus pour être réutilisés plus de 100 fois, avec une capacité de 10kg. Chaque sac distribué évite l'utilisation de 50+ sacs plastiques jetables, contribuant significativement à la réduction des déchets."
    },
    {
      question: "Puis-je cibler une zone géographique précise ?",
      answer: "Oui ! Vous pouvez choisir de cibler une ville spécifique, un département entier, ou toute la Normandie. Notre système vous permet de sélectionner précisément les zones où vous souhaitez être visible, en fonction de votre clientèle cible."
    },
    {
      question: "Comment suivre l'impact de ma campagne ?",
      answer: "Nous fournissons des rapports détaillés selon votre forfait : mensuels pour Starter, hebdomadaires pour Business, et en temps réel pour Premium. Vous accédez à des analytics complets : nombre de sacs distribués, zones de distribution, partenaires impliqués, et estimation de la portée. Un dashboard intuitif vous permet de tout suivre en un coup d'œil."
    },
    {
      question: "Combien de temps faut-il pour lancer une campagne ?",
      answer: "Une fois votre inscription validée et votre logo fourni, votre campagne peut démarrer en 2-3 semaines. Ce délai inclut la préparation des visuels, l'impression des sacs, et la distribution aux commerces partenaires de votre zone cible."
    },
    {
      question: "Puis-je modifier mon message publicitaire en cours de campagne ?",
      answer: "Pour des raisons logistiques liées à l'impression, les modifications ne sont pas possibles pour les sacs déjà imprimés. Cependant, vous pouvez planifier une nouvelle campagne avec un message différent, et nous proposons des tarifs préférentiels pour les campagnes successives."
    },
    {
      question: "Y a-t-il des restrictions sur le type d'entreprise ?",
      answer: "Nous acceptons toutes les entreprises légales respectant la réglementation française. Sont exclus : tabac, alcool, jeux d'argent, et tout contenu inapproprié ou discriminatoire. Nous nous réservons le droit de refuser toute publicité ne correspondant pas à nos valeurs éco-responsables et locales."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HelpCircle className="w-4 h-4" />
            Questions fréquentes
          </motion.div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Tout ce que vous devez <span className="text-emerald-600">savoir</span>
          </h2>
          <p className="text-xl text-gray-600">
            Vous avez des questions ? Nous avons les réponses !
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Minus className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous aider et répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/30"
            >
              Nous contacter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              Prendre rendez-vous
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
