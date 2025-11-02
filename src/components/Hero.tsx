import { motion } from 'framer-motion';
import { ShoppingBag, Leaf, MapPin } from 'lucide-react';

interface HeroProps {
  onClientClick: () => void;
  onPartnerClick: () => void;
}

export default function Hero({ onClientClick, onPartnerClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,184,148,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,184,148,0.06),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Leaf className="w-4 h-4" />
            Publicité éco-responsable en Normandie
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            Votre marque dans<br />
            <span className="text-emerald-600">les mains de la Normandie</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            BagPresto connecte les entreprises locales avec des sacs publicitaires réutilisables,
            distribués gratuitement dans les commerces partenaires de Normandie.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={onClientClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Je veux faire ma pub
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.button>

            <motion.button
              onClick={onPartnerClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-colors duration-300"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Je veux distribuer les sacs
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative mt-20"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <ShoppingBag className="w-32 h-32 md:w-40 md:h-40 text-white/90" />

                <motion.div
                  className="absolute top-8 left-8 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </motion.div>

                <motion.div
                  className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="text-sm text-gray-600">12 publicités</div>
              <div className="text-2xl font-bold text-emerald-600">par sac</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-emerald-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
