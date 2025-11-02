import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';

export default function BagVisualizer() {
  const [rotation, setRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState('emerald');

  const colors = [
    { name: 'emerald', gradient: 'from-emerald-600 to-emerald-400', label: 'Vert Éco' },
    { name: 'blue', gradient: 'from-blue-600 to-blue-400', label: 'Bleu Océan' },
    { name: 'purple', gradient: 'from-purple-600 to-purple-400', label: 'Violet Royal' },
    { name: 'orange', gradient: 'from-orange-600 to-orange-400', label: 'Orange Soleil' },
  ];

  const logoPositions = [
    { top: '15%', left: '20%', size: 'w-16 h-16' },
    { top: '15%', right: '20%', size: 'w-16 h-16' },
    { top: '35%', left: '15%', size: 'w-12 h-12' },
    { top: '35%', right: '15%', size: 'w-12 h-12' },
    { top: '55%', left: '20%', size: 'w-14 h-14' },
    { top: '55%', right: '20%', size: 'w-14 h-14' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-300 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            Visualisateur 3D
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Visualisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">sac personnalisé</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez en temps réel comment votre logo apparaîtra sur nos sacs réutilisables
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ perspective: 1000 }}
                className={`relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br ${
                  colors.find(c => c.name === selectedColor)?.gradient
                } rounded-3xl shadow-2xl overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <div className="absolute inset-0 backdrop-blur-[1px]" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ShoppingBag className="w-32 h-32 text-white/30" />
                  </motion.div>
                </div>

                {logoPositions.map((pos, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute ${pos.size} bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center`}
                    style={{ ...pos }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      🏢
                    </motion.div>
                  </motion.div>
                ))}

                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-xl flex items-center justify-center">
                    <Store className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white text-gray-900 rounded-2xl shadow-2xl p-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-sm font-medium text-gray-600 mb-1">Visibilité</div>
                <div className="text-3xl font-bold text-emerald-600">12</div>
                <div className="text-xs text-gray-500">logos par sac</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-emerald-400" />
                Rotation 3D
              </h3>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRotation(rotation - 90)}
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-medium"
                >
                  ← Gauche
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRotation(0)}
                  className="flex-1 px-6 py-4 bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRotation(rotation + 90)}
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-medium"
                >
                  Droite →
                </motion.button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-emerald-400" />
                Couleurs disponibles
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.name)}
                    className={`px-6 py-4 rounded-xl transition-all ${
                      selectedColor === color.name
                        ? `bg-gradient-to-r ${color.gradient} shadow-lg scale-105`
                        : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium">{color.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Caractéristiques premium
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Matériau 100% recyclé et biodégradable
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Impression haute qualité longue durée
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Capacité 10kg, réutilisable 100+ fois
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Dimensions optimales 38x42cm
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Store(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM18.91 4.99l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zM4.04 9.36L5.05 5h1.97L6.44 9.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z"/>
    </svg>
  );
}
