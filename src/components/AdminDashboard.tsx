import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Store, Package, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { supabase, Client, Partner, Campaign } from '../lib/supabase';
import DashboardLayout from './DashboardLayout';

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [clientsRes, partnersRes, campaignsRes] = await Promise.all([
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
      supabase.from('partners').select('*').order('created_at', { ascending: false }),
      supabase.from('campaigns').select('*, clients(company_name)').order('created_at', { ascending: false }),
    ]);

    if (clientsRes.data) setClients(clientsRes.data);
    if (partnersRes.data) setPartners(partnersRes.data);
    if (campaignsRes.data) setCampaigns(campaignsRes.data as any);

    setLoading(false);
  };

  const updateStatus = async (table: string, id: string, status: string) => {
    await supabase.from(table).update({ status }).eq('id', id);
    fetchAllData();
  };

  const pendingClients = clients.filter(c => c.status === 'pending').length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const pendingPartners = partners.filter(p => p.status === 'pending').length;
  const activePartners = partners.filter(p => p.status === 'active').length;
  const totalBagsPrinted = campaigns.reduce((sum, c) => sum + c.bags_printed, 0);

  if (loading) {
    return (
      <DashboardLayout title="Administration" subtitle="Chargement...">
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Tableau de bord Admin"
      subtitle="Vue d'ensemble de la plateforme BagPresto"
    >
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{clients.length}</div>
          <div className="text-sm text-gray-600">Clients totaux</div>
          <div className="mt-2 text-xs text-yellow-600">{pendingClients} en attente</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Store className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{partners.length}</div>
          <div className="text-sm text-gray-600">Partenaires totaux</div>
          <div className="mt-2 text-xs text-yellow-600">{pendingPartners} en attente</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{campaigns.length}</div>
          <div className="text-sm text-gray-600">Campagnes totales</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalBagsPrinted.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Sacs imprimés</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Clients en attente de validation</h3>
          {clients.filter(c => c.status === 'pending').length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun client en attente</p>
          ) : (
            <div className="space-y-3">
              {clients.filter(c => c.status === 'pending').map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{client.company_name}</h4>
                      <p className="text-sm text-gray-600">{client.sector}</p>
                      <p className="text-xs text-gray-500 mt-1">CP: {client.postal_code}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus('clients', client.id, 'active')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => updateStatus('clients', client.id, 'suspended')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Refuser
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Partenaires en attente de validation</h3>
          {partners.filter(p => p.status === 'pending').length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun partenaire en attente</p>
          ) : (
            <div className="space-y-3">
              {partners.filter(p => p.status === 'pending').map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{partner.business_name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{partner.business_type}</p>
                      <p className="text-xs text-gray-500 mt-1">{partner.city} - {partner.postal_code}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus('partners', partner.id, 'active')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => updateStatus('partners', partner.id, 'suspended')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Refuser
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Toutes les campagnes</h3>
        {campaigns.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune campagne enregistrée</p>
        ) : (
          <div className="space-y-3">
            {campaigns.slice(0, 10).map((campaign, index) => {
              const client = (campaign as any).clients;
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{campaign.campaign_name}</h4>
                      {client && <p className="text-sm text-gray-600">{client.company_name}</p>}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{new Date(campaign.start_date).toLocaleDateString('fr-FR')}</span>
                        <span>→</span>
                        <span>{new Date(campaign.end_date).toLocaleDateString('fr-FR')}</span>
                        <span>•</span>
                        <span>{campaign.bags_printed.toLocaleString()} sacs</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      campaign.status === 'distributed' ? 'bg-emerald-100 text-emerald-800' :
                      campaign.status === 'printing' ? 'bg-purple-100 text-purple-800' :
                      campaign.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
