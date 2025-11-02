import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, MapPin, Plus, Calendar } from 'lucide-react';
import { supabase, Campaign, Client } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from './DashboardLayout';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchClientData();
    }
  }, [user]);

  const fetchClientData = async () => {
    if (!user) return;

    const { data: clientData } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (clientData) {
      setClient(clientData);

      const { data: campaignsData } = await supabase
        .from('campaigns')
        .select('*')
        .eq('client_id', clientData.id)
        .order('created_at', { ascending: false });

      if (campaignsData) {
        setCampaigns(campaignsData);
      }
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      printing: 'bg-purple-100 text-purple-800',
      distributed: 'bg-emerald-100 text-emerald-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'En attente',
      approved: 'Approuvée',
      printing: 'En impression',
      distributed: 'Distribuée',
      completed: 'Terminée',
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <DashboardLayout title="Tableau de bord" subtitle="Chargement...">
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout title="Tableau de bord" subtitle="Aucune donnée disponible">
        <div className="text-center py-12">
          <p className="text-gray-600">Impossible de charger vos données</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalBagsPrinted = campaigns.reduce((sum, c) => sum + c.bags_printed, 0);
  const activeCampaigns = campaigns.filter(c => ['approved', 'printing', 'distributed'].includes(c.status)).length;

  return (
    <DashboardLayout
      title="Tableau de bord Client"
      subtitle={`Bienvenue ${client.company_name}`}
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              client.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {client.status === 'active' ? 'Actif' : 'En attente'}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalBagsPrinted.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Sacs imprimés au total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{activeCampaigns}</div>
          <div className="text-sm text-gray-600">Campagnes actives</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{client.postal_code}</div>
          <div className="text-sm text-gray-600">Zone de distribution</div>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Mes campagnes</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" />
            Nouvelle campagne
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Aucune campagne pour le moment</p>
            <p className="text-sm text-gray-500">Créez votre première campagne pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{campaign.campaign_name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusLabel(campaign.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(campaign.start_date).toLocaleDateString('fr-FR')} - {new Date(campaign.end_date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{campaign.bags_printed.toLocaleString()} sacs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Informations de votre entreprise</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-emerald-100 text-sm mb-1">Secteur d'activité</div>
            <div className="font-semibold">{client.sector}</div>
          </div>
          <div>
            <div className="text-emerald-100 text-sm mb-1">Code postal</div>
            <div className="font-semibold">{client.postal_code}</div>
          </div>
          {client.message && (
            <div className="md:col-span-2">
              <div className="text-emerald-100 text-sm mb-1">Message publicitaire</div>
              <div className="font-semibold">{client.message}</div>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
