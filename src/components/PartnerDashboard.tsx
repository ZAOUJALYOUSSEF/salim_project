import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Store, Download, MapPin, Users } from 'lucide-react';
import { supabase, Partner } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from './DashboardLayout';

interface CampaignPartner {
  id: string;
  bags_allocated: number;
  bags_distributed: number;
  campaigns: {
    campaign_name: string;
    start_date: string;
    end_date: string;
    clients: {
      company_name: string;
      sector: string;
    };
  };
}

export default function PartnerDashboard() {
  const { user } = useAuth();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [campaignPartners, setCampaignPartners] = useState<CampaignPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPartnerData();
    }
  }, [user]);

  const fetchPartnerData = async () => {
    if (!user) return;

    const { data: partnerData } = await supabase
      .from('partners')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (partnerData) {
      setPartner(partnerData);

      const { data: cpData } = await supabase
        .from('campaign_partners')
        .select(`
          id,
          bags_allocated,
          bags_distributed,
          campaigns (
            campaign_name,
            start_date,
            end_date,
            clients (
              company_name,
              sector
            )
          )
        `)
        .eq('partner_id', partnerData.id);

      if (cpData) {
        setCampaignPartners(cpData as any);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <DashboardLayout title="Tableau de bord" subtitle="Chargement...">
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!partner) {
    return (
      <DashboardLayout title="Tableau de bord" subtitle="Aucune donnée disponible">
        <div className="text-center py-12">
          <p className="text-gray-600">Impossible de charger vos données</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalBagsReceived = campaignPartners.reduce((sum, cp) => sum + cp.bags_allocated, 0);
  const totalBagsDistributed = campaignPartners.reduce((sum, cp) => sum + cp.bags_distributed, 0);
  const uniqueClients = new Set(campaignPartners.map(cp => (cp.campaigns as any).clients?.company_name)).size;

  return (
    <DashboardLayout
      title="Tableau de bord Partenaire"
      subtitle={`Bienvenue ${partner.business_name}`}
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              partner.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {partner.status === 'active' ? 'Actif' : 'En attente'}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalBagsReceived.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Sacs reçus au total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalBagsDistributed.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Sacs distribués</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{uniqueClients}</div>
          <div className="text-sm text-gray-600">Annonceurs différents</div>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Mes distributions</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
            <Download className="w-4 h-4" />
            Badge Partenaire
          </button>
        </div>

        {campaignPartners.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Aucune distribution en cours</p>
            <p className="text-sm text-gray-500">Vous recevrez des sacs dès qu'une campagne vous sera attribuée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaignPartners.map((cp, index) => {
              const campaign = cp.campaigns as any;
              const client = campaign?.clients;

              return (
                <motion.div
                  key={cp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{campaign?.campaign_name || 'Campagne'}</h4>
                      {client && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">{client.company_name}</span>
                          <span className="text-sm text-gray-500"> • {client.sector}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          <span>{cp.bags_allocated.toLocaleString()} sacs alloués</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Store className="w-4 h-4" />
                          <span>{cp.bags_distributed.toLocaleString()} distribués</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((cp.bags_distributed / cp.bags_allocated) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Progression</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Informations de votre commerce</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-purple-100 text-sm mb-1">Type de commerce</div>
            <div className="font-semibold capitalize">{partner.business_type}</div>
          </div>
          <div>
            <div className="text-purple-100 text-sm mb-1">Adresse</div>
            <div className="font-semibold">{partner.address}</div>
          </div>
          <div>
            <div className="text-purple-100 text-sm mb-1">Ville</div>
            <div className="font-semibold">{partner.city} ({partner.postal_code})</div>
          </div>
          <div>
            <div className="text-purple-100 text-sm mb-1">Capacité de distribution</div>
            <div className="font-semibold">{partner.bag_quantity.toLocaleString()} sacs</div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
