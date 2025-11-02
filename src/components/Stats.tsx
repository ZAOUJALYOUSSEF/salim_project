import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase, Statistics } from '../lib/supabase';
import { ShoppingBag, Users, Leaf } from 'lucide-react';

export default function Stats() {
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from('statistics')
      .select('*')
      .maybeSingle();

    if (data) {
      setStats(data);
    }
  };

  const counters = [
    {
      icon: ShoppingBag,
      value: stats?.total_bags_distributed || 0,
      label: "Sacs distribués",
      suffix: "",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      value: stats?.total_partners || 0,
      label: "Partenaires actifs",
      suffix: "",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Leaf,
      value: Math.round(stats?.co2_saved_kg || 0),
      label: "CO₂ économisé",
      suffix: " kg",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre impact en <span className="text-emerald-600">Normandie</span>
          </h2>
          <p className="text-gray-600 text-lg">Des chiffres qui parlent d'eux-mêmes</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${counter.color} flex items-center justify-center mb-6 shadow-lg mx-auto`}>
                <counter.icon className="w-8 h-8 text-white" />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                className="text-5xl font-bold text-gray-900 mb-2 text-center"
              >
                {counter.value.toLocaleString('fr-FR')}{counter.suffix}
              </motion.div>

              <p className="text-gray-600 text-center font-medium">{counter.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
