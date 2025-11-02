import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Marie Dubois",
      business: "Boulangerie Le Fournil",
      city: "Caen (14)",
      image: "👩‍🍳",
      rating: 5,
      text: "BagPresto a transformé notre visibilité ! Nos clients adorent les sacs et nous recevons régulièrement des nouveaux clients grâce aux publicités. Un concept gagnant-gagnant !",
      role: "Partenaire"
    },
    {
      name: "Jean-Pierre Martin",
      business: "Restaurant Le Goût Normand",
      city: "Rouen (76)",
      image: "👨‍🍳",
      rating: 5,
      text: "Excellente initiative ! Nous avons triplé notre visibilité locale en 3 mois. Les sacs circulent partout dans la ville et notre chiffre d'affaires a augmenté de 40%.",
      role: "Annonceur"
    },
    {
      name: "Sophie Laurent",
      business: "Pharmacie du Centre",
      city: "Évreux (27)",
      image: "👩‍⚕️",
      rating: 5,
      text: "Distribuer ces sacs éco-responsables valorise notre engagement environnemental. Nos clients sont ravis et fiers de les utiliser au quotidien !",
      role: "Partenaire"
    },
    {
      name: "Thomas Petit",
      business: "Garage Petit & Fils",
      city: "Alençon (61)",
      image: "👨‍🔧",
      rating: 5,
      text: "ROI exceptionnel ! Pour un investissement minime, notre notoriété locale a explosé. Nous sommes sollicités bien au-delà de notre zone habituelle.",
      role: "Annonceur"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
            Ils nous font confiance
          </motion.div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos <span className="text-emerald-600">partenaires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages authentiques de ceux qui font vivre BagPresto au quotidien
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[400px] md:h-[350px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.8,
                  x: index === activeIndex ? 0 : index < activeIndex ? -100 : 100,
                }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${index === activeIndex ? 'z-10' : 'z-0'}`}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative h-full">
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-emerald-100" />

                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="text-6xl"
                    >
                      {testimonial.image}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-emerald-600 font-medium">{testimonial.business}</p>
                      <p className="text-gray-500 text-sm">{testimonial.city}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
                    "{testimonial.text}"
                  </p>

                  <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">+250%</div>
            <div className="text-gray-600">Visibilité moyenne</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Partenaires actifs</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
