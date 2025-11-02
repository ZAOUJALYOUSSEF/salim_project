import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, TrendingUp, Users, Target, Zap, Check, Star, MapPin, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase, Statistics } from '../lib/supabase';
import Header from '../components/Header';
import FAQ from '../components/FAQ';

export default function HomePage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [stats, setStats] = useState<Statistics | null>(null);

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase.from('statistics').select('*').maybeSingle();
    if (data) setStats(data);
  };

  const features = [
    {
      icon: Target,
      title: "Ciblage Ultra-Précis",
      description: "Atteignez exactement votre clientèle dans toute la Normandie",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "ROI Garanti",
      description: "+250% de visibilité locale en moyenne pour nos clients",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Users,
      title: "Réseau Premium",
      description: "500+ points de distribution dans les meilleurs commerces",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Leaf,
      title: "Impact Positif",
      description: "100% éco-responsable, faites du bien à votre image",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choisissez votre formule",
      description: "Des packages adaptés à chaque budget",
      icon: Sparkles
    },
    {
      number: "02",
      title: "Personnalisez votre sac",
      description: "Notre équipe design intègre votre logo et message",
      icon: Zap
    },
    {
      number: "03",
      title: "Distribution massive",
      description: "Vos sacs arrivent dans les mains de milliers de normands",
      icon: Target
    },
    {
      number: "04",
      title: "Suivez vos résultats",
      description: "Dashboard analytics en temps réel pour mesurer l'impact",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      name: "Sophie Martin",
      business: "Restaurant Le Goût Normand",
      image: "👩‍🍳",
      text: "Notre CA a augmenté de 45% en 3 mois. BagPresto a révolutionné notre visibilité locale !",
      rating: 5
    },
    {
      name: "Jean Dubois",
      business: "Garage Auto Expert",
      image: "👨‍🔧",
      text: "Meilleur investissement marketing jamais fait. Le téléphone n'arrête pas de sonner !",
      rating: 5
    },
    {
      name: "Marie Leroy",
      business: "Boutique Mode & Style",
      image: "👗",
      text: "Design magnifique, distribution impeccable. Nos sacs sont devenus iconiques dans la ville.",
      rating: 5
    }
  ];

  function ROICalculator({ navigate }: { navigate: any }) {
    const [postalCode, setPostalCode] = useState('');
    const [budget, setBudget] = useState(149);
    const [results, setResults] = useState<any>(null);

    const NORMANDY_DEPARTMENTS = ['14', '27', '50', '61', '76'];

    const calculateROI = () => {
      if (!postalCode || postalCode.length !== 5) {
        return;
      }

      const dept = postalCode.substring(0, 2);
      if (!NORMANDY_DEPARTMENTS.includes(dept)) {
        return;
      }

      let bagsDistributed = 0;
      let partners = 0;
      let reach = 0;
      let avgROI = 0;

      if (budget >= 149 && budget < 399) {
        bagsDistributed = 500;
        partners = 5;
        reach = 2500;
        avgROI = 1875;
      } else if (budget >= 399 && budget < 899) {
        bagsDistributed = 2000;
        partners = 15;
        reach = 10000;
        avgROI = 10000;
      } else if (budget >= 899) {
        bagsDistributed = 5000;
        partners = 40;
        reach = 25000;
        avgROI = 32500;
      }

      setResults({
        bagsDistributed,
        partners,
        reach,
        avgROI,
        visibilityIncrease: 250
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10"
      >
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-3">
              <MapPin className="w-4 h-4" />
              Votre code postal (Normandie)
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              maxLength={5}
              placeholder="14000"
              className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none transition-all text-lg"
            />
            <p className="text-emerald-300 text-xs mt-2">14, 27, 50, 61, 76</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-3">
              <Sparkles className="w-4 h-4" />
              Votre budget (€)
            </label>
            <div className="relative">
              <input
                type="range"
                min="149"
                max="1500"
                step="50"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-white/60 text-xs mt-2">
                <span>149€</span>
                <span className="text-2xl font-bold text-emerald-400">{budget}€</span>
                <span>1500€</span>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          onClick={calculateROI}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
        >
          Calculer mon ROI
        </motion.button>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 grid md:grid-cols-4 gap-6"
          >
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-emerald-400 mb-2">
                {results.bagsDistributed.toLocaleString()}
              </div>
              <div className="text-emerald-200 text-sm">Sacs distribués</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">
                {results.partners}
              </div>
              <div className="text-blue-200 text-sm">Partenaires actifs</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">
                {results.reach.toLocaleString()}
              </div>
              <div className="text-purple-200 text-sm">Portée estimée</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-yellow-400 mb-2">
                +{results.visibilityIncrease}%
              </div>
              <div className="text-yellow-200 text-sm">Visibilité</div>
            </div>

            <div className="md:col-span-4 bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-400/40 rounded-2xl p-8 text-center">
              <div className="text-lg text-emerald-200 mb-2">ROI Estimé</div>
              <div className="text-6xl font-black text-emerald-400 mb-4">
                {results.avgROI.toLocaleString()}€
              </div>
              <p className="text-emerald-200 mb-6">
                Soit un retour sur investissement de <span className="font-bold text-white">{Math.round((results.avgROI / budget) * 100)}%</span>
              </p>
              <motion.button
                onClick={() => navigate('/client')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                Lancer ma campagne maintenant
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* HERO SECTION - ULTRA PREMIUM */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.2),transparent_50%)]" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            style={{ opacity, scale }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-6 py-3 rounded-full text-emerald-300 mb-8 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">La révolution du marketing local en Normandie</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                Votre marque dans<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400">
                  les mains de la Normandie
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Transformez des sacs éco-responsables en <span className="text-emerald-400 font-semibold">puissants outils marketing</span>.
                Visibilité maximale, impact mesurable, ROI garanti.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  onClick={() => navigate('/client')}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-emerald-600/50 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Lancer ma campagne
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={() => navigate('/partner')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
                >
                  Devenir partenaire
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex flex-wrap justify-center gap-12 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>500+ entreprises</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>100% éco-responsable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>ROI moyen +250%</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: stats?.total_bags_distributed || "+10 000", label: "Sacs distribués", icon: ShoppingBag, color: "emerald" },
              { value: stats?.total_partners || "+50", label: "Partenaires actifs", icon: Users, color: "blue" },
              { value: "+80%", label: "kg CO₂ économisé", icon: Leaf, color: "green" },
              { value: "250%", label: "ROI moyen", icon: TrendingUp, color: "purple" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-2">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString('fr-FR') : stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL BAG SHOWCASE */}
      <section className="py-32 bg-gradient-to-br from-white via-emerald-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Le sac qui fait la différence
              </motion.div>

              <h2 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
                Un sac <span className="text-emerald-600">éco-responsable</span><br />
                qui porte votre succès
              </h2>

              <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                Chaque sac BagPresto peut afficher <span className="font-bold text-emerald-600">jusqu'à 12 publicités</span> de marques locales, tout en mettant en avant votre commerce.
              </p>

              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Matériau 100% recyclé et biodégradable</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Capacité 10kg - Réutilisable +5 fois</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Design premium avec impression haute qualité</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Dimensions optimales 38x42cm</span>
                </motion.div>
              </div>

              <motion.button
                onClick={() => navigate('/client')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl font-bold text-xl shadow-2xl shadow-emerald-600/40 hover:shadow-3xl transition-all inline-flex items-center gap-3"
              >
                Je veux mon sac personnalisé
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src="/Gemini_Generated_Image_ify66aify66aify6.png"
                  alt="Sac BagPresto avec publicités"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6"
                >
                  <div className="text-sm text-gray-600 mb-1">Visibilité par sac</div>
                  <div className="text-5xl font-black text-emerald-600">12</div>
                  <div className="text-xs text-gray-500">entreprises</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-8 -right-8 bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-2xl shadow-2xl p-6"
                >
                  <div className="text-sm text-emerald-100 mb-1">Impact CO₂</div>
                  <div className="text-4xl font-black">-95%</div>
                  <div className="text-xs text-emerald-200">vs plastique</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* COMPARISON BEFORE/AFTER */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              Avant / Après <span className="text-emerald-600">BagPresto</span>
            </h2>
            <p className="text-2xl text-gray-600">
              Découvrez l'impact réel sur votre entreprise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-3xl p-10 relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                AVANT
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-8 mt-8">
                Marketing traditionnel
              </h3>

              <div className="space-y-4">
                {[
                  "Budget pub élevé sans garantie",
                  "Portée limitée à votre zone",
                  "Difficile de mesurer le ROI",
                  "Publicité intrusive et ignorée",
                  "Impact environnemental négatif"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">✗</span>
                    </div>
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 relative overflow-hidden border-4 border-emerald-600"
            >
              <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                APRÈS
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-8 mt-8">
                Avec BagPresto
              </h3>

              <div className="space-y-4">
                {[
                  "ROI garanti +250% minimum",
                  "Visibilité dans toute la Normandie",
                  "Analytics précis en temps réel",
                  "Marketing apprécié et utile",
                  "100% éco-responsable et valorisant"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/client')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Passer à BagPresto maintenant
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Certifié et approuvé par
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-gray-900 text-sm">100% Éco</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-gray-900 text-sm">Made in France</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-gray-900 text-sm">Qualité Premium</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-gray-900 text-sm">ROI Garanti</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-gray-900 text-sm">Support 7j/7</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              Pourquoi <span className="text-emerald-600">BagPresto</span> ?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              La solution complète pour dominer votre marché local
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity rounded-full -mr-32 -mt-32`} />

                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="concept" className="py-32 bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black mb-6">
              Comment ça <span className="text-emerald-400">marche</span> ?
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              4 étapes simples pour révolutionner votre visibilité locale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-8xl font-black text-white/10 mb-4">{step.number}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              Ils ont <span className="text-emerald-600">explosé</span> leurs résultats
            </h2>
            <p className="text-2xl text-gray-600">Témoignages authentiques de vrais clients</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-emerald-600 text-sm">{testimonial.business}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section id="calculator" className="py-32 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.2),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-6 relative">
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
              Calculateur ROI Gratuit
            </motion.div>

            <h2 className="text-6xl font-black mb-6">
              Estimez vos <span className="text-emerald-400">résultats</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Découvrez combien de personnes vous pouvez atteindre avec votre budget
            </p>
          </motion.div>

          <ROICalculator navigate={navigate} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white">
        <FAQ />
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl font-black mb-8">
              Prêt à dominer votre <span className="text-emerald-200">marché local</span> ?
            </h2>
            <p className="text-3xl text-emerald-100 mb-12">
              Rejoignez les 500+ entreprises qui ont choisi BagPresto
            </p>

            <motion.button
              onClick={() => navigate('/client')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-16 py-8 bg-white text-emerald-600 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-4"
            >
              Démarrer maintenant
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <p className="mt-8 text-emerald-200 text-lg">
              Première campagne • Sans engagement • ROI garanti
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
