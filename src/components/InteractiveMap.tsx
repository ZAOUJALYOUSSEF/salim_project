import { motion } from 'framer-motion';
import { MapPin, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Partner } from '../lib/supabase';

export default function InteractiveMap() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data } = await supabase
      .from('partners')
      .select('*')
      .eq('status', 'active');

    if (data) {
      setPartners(data);
    }
  };

  const cities = partners.reduce((acc, partner) => {
    const city = partner.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);

  const departments = [
    { code: '14', name: 'Calvados', color: 'from-blue-500 to-blue-600' },
    { code: '27', name: 'Eure', color: 'from-emerald-500 to-emerald-600' },
    { code: '50', name: 'Manche', color: 'from-purple-500 to-purple-600' },
    { code: '61', name: 'Orne', color: 'from-orange-500 to-orange-600' },
    { code: '76', name: 'Seine-Maritime', color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Nos partenaires en <span className="text-emerald-600">Normandie</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les commerces qui distribuent nos sacs publicitaires éco-responsables
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Départements normands
            </h3>

            <div className="space-y-4 mb-8">
              {departments.map((dept, index) => {
                const deptPartners = partners.filter(p => p.postal_code.startsWith(dept.code));
                return (
                  <motion.div
                    key={dept.code}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {dept.code}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                          <p className="text-sm text-gray-600">{deptPartners.length} partenaires</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{deptPartners.length}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Total des partenaires actifs</h4>
              <div className="text-4xl font-bold text-emerald-600">{partners.length}</div>
              <p className="text-sm text-gray-600 mt-1">Commerces partenaires en Normandie</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-600" />
              Liste des partenaires
            </h3>

            {partners.length === 0 ? (
              <div className="text-center py-12">
                <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Aucun partenaire actif pour le moment</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {Object.entries(cities).map(([city, cityPartners], index) => (
                  <div key={city}>
                    <h4 className="font-semibold text-gray-700 mb-2 sticky top-0 bg-white py-1">
                      {city} ({cityPartners.length})
                    </h4>
                    {cityPartners.map((partner) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedPartner(partner)}
                        className="bg-gray-50 rounded-xl p-4 mb-2 hover:bg-emerald-50 transition-colors cursor-pointer border border-gray-200 hover:border-emerald-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Store className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{partner.business_name}</h5>
                            <p className="text-sm text-gray-600 capitalize">{partner.business_type}</p>
                            <p className="text-xs text-gray-500 mt-1">{partner.address}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPartner.business_name}</h3>
                  <p className="text-gray-600 capitalize">{selectedPartner.business_type}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Adresse</div>
                  <div className="font-medium text-gray-900">{selectedPartner.address}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Ville</div>
                    <div className="font-medium text-gray-900">{selectedPartner.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Code postal</div>
                    <div className="font-medium text-gray-900">{selectedPartner.postal_code}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Capacité de distribution</div>
                  <div className="font-medium text-gray-900">{selectedPartner.bag_quantity.toLocaleString()} sacs</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPartner(null)}
                className="w-full mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
