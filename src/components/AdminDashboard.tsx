import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Store, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  MoreVertical,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  BarChart3,
  Bell,
  ChevronDown,
  Plus,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CreditCard,
  Target,
  MessageCircle,
  Clock
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

// Types
interface Client {
  id: string;
  company_name: string;
  sector: string;
  postal_code: string;
  status: 'pending' | 'active' | 'suspended';
  created_at: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
  revenue?: number;
}

interface Partner {
  id: string;
  business_name: string;
  business_type: string;
  city: string;
  postal_code: string;
  status: 'pending' | 'active' | 'suspended';
  created_at: string;
  email: string;
  phone: string;
  capacity: number;
  rating: number;
  completed_orders: number;
}

interface Campaign {
  id: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  bags_printed: number;
  bags_distributed: number;
  status: 'pending' | 'approved' | 'printing' | 'distributed' | 'completed' | 'cancelled';
  client_id: string;
  client?: {
    company_name: string;
    email: string;
  };
  created_at: string;
  budget: number;
  progress: number;
  partner_id?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
}

// Données mockées complètes
const mockClients: Client[] = [
  {
    id: '1',
    company_name: 'Nike France',
    sector: 'Sport',
    postal_code: '75008',
    status: 'pending',
    created_at: '2024-01-15T10:00:00Z',
    email: 'contact@nike.fr',
    phone: '+33 1 45 62 78 90',
    address: '123 Avenue des Champs-Élysées, Paris',
    contact_person: 'Marie Dubois',
    revenue: 125000
  },
  {
    id: '2',
    company_name: 'Zara Paris',
    sector: 'Mode',
    postal_code: '75001',
    status: 'active',
    created_at: '2024-01-14T09:00:00Z',
    email: 'partenariat@zara.fr',
    phone: '+33 1 40 20 40 20',
    address: '45 Rue de Rivoli, Paris',
    contact_person: 'Jean Martin',
    revenue: 89000
  },
  {
    id: '3',
    company_name: 'Carrefour Market',
    sector: 'Distribution',
    postal_code: '75017',
    status: 'pending',
    created_at: '2024-01-16T14:30:00Z',
    email: 'marketing@carrefour.fr',
    phone: '+33 1 48 88 28 82',
    address: '78 Boulevard Malesherbes, Paris',
    contact_person: 'Sophie Laurent',
    revenue: 0
  },
  {
    id: '4',
    company_name: 'L\'Oréal Paris',
    sector: 'Cosmétique',
    postal_code: '75016',
    status: 'active',
    created_at: '2024-01-10T11:20:00Z',
    email: 'events@loreal.fr',
    phone: '+33 1 47 56 70 00',
    address: '14 Rue Royale, Paris',
    contact_person: 'Pierre Moreau',
    revenue: 156000
  },
  {
    id: '5',
    company_name: 'Adidas France',
    sector: 'Sport',
    postal_code: '75009',
    status: 'active',
    created_at: '2024-01-18T08:15:00Z',
    email: 'partnership@adidas.fr',
    phone: '+33 1 55 66 77 88',
    address: '22 Rue de la Paix, Paris',
    contact_person: 'Thomas Bernard',
    revenue: 110000
  }
];

const mockPartners: Partner[] = [
  {
    id: '1',
    business_name: 'Imprimerie Paris Nord',
    business_type: 'imprimerie',
    city: 'Paris',
    postal_code: '75018',
    status: 'pending',
    created_at: '2024-01-15T11:00:00Z',
    email: 'contact@imprimerie-paris-nord.fr',
    phone: '+33 1 42 23 45 67',
    capacity: 50000,
    rating: 4.2,
    completed_orders: 45
  },
  {
    id: '2',
    business_name: 'Print Service Pro',
    business_type: 'imprimerie',
    city: 'Lyon',
    postal_code: '69001',
    status: 'active',
    created_at: '2024-01-13T08:00:00Z',
    email: 'info@printservicepro.fr',
    phone: '+33 4 78 90 12 34',
    capacity: 75000,
    rating: 4.8,
    completed_orders: 128
  },
  {
    id: '3',
    business_name: 'Eco Print Solutions',
    business_type: 'imprimerie',
    city: 'Marseille',
    postal_code: '13001',
    status: 'pending',
    created_at: '2024-01-16T16:45:00Z',
    email: 'contact@ecoprintsolutions.fr',
    phone: '+33 4 91 23 45 67',
    capacity: 30000,
    rating: 4.0,
    completed_orders: 23
  },
  {
    id: '4',
    business_name: 'Quick Print Marseille',
    business_type: 'imprimerie',
    city: 'Marseille',
    postal_code: '13008',
    status: 'active',
    created_at: '2024-01-12T13:15:00Z',
    email: 'contact@quickprint.fr',
    phone: '+33 4 95 67 89 01',
    capacity: 60000,
    rating: 4.5,
    completed_orders: 89
  },
  {
    id: '5',
    business_name: 'Premium Print Paris',
    business_type: 'imprimerie',
    city: 'Paris',
    postal_code: '75011',
    status: 'active',
    created_at: '2024-01-17T14:20:00Z',
    email: 'contact@premiumprint.fr',
    phone: '+33 1 48 07 12 34',
    capacity: 100000,
    rating: 4.9,
    completed_orders: 210
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    campaign_name: 'Collection Printemps 2024',
    start_date: '2024-03-01',
    end_date: '2024-05-31',
    bags_printed: 15000,
    bags_distributed: 12000,
    status: 'distributed',
    client_id: '2',
    client: { company_name: 'Zara Paris', email: 'partenariat@zara.fr' },
    created_at: '2024-01-10T09:00:00Z',
    budget: 45000,
    progress: 80,
    partner_id: '2'
  },
  {
    id: '2',
    campaign_name: 'Tournoi de Football',
    start_date: '2024-04-15',
    end_date: '2024-06-15',
    bags_printed: 8000,
    bags_distributed: 3000,
    status: 'printing',
    client_id: '1',
    client: { company_name: 'Nike France', email: 'contact@nike.fr' },
    created_at: '2024-01-12T14:20:00Z',
    budget: 25000,
    progress: 45,
    partner_id: '4'
  },
  {
    id: '3',
    campaign_name: 'Promotion Été',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    bags_printed: 0,
    bags_distributed: 0,
    status: 'approved',
    client_id: '3',
    client: { company_name: 'Carrefour Market', email: 'marketing@carrefour.fr' },
    created_at: '2024-01-14T11:30:00Z',
    budget: 75000,
    progress: 10
  },
  {
    id: '4',
    campaign_name: 'Événement Lancement',
    start_date: '2024-02-01',
    end_date: '2024-02-28',
    bags_printed: 5000,
    bags_distributed: 5000,
    status: 'completed',
    client_id: '1',
    client: { company_name: 'Nike France', email: 'contact@nike.fr' },
    created_at: '2024-01-08T16:00:00Z',
    budget: 15000,
    progress: 100,
    partner_id: '2'
  },
  {
    id: '5',
    campaign_name: 'Festival de Mode Paris',
    start_date: '2024-07-01',
    end_date: '2024-07-31',
    bags_printed: 0,
    bags_distributed: 0,
    status: 'pending',
    client_id: '4',
    client: { company_name: 'L\'Oréal Paris', email: 'events@loreal.fr' },
    created_at: '2024-01-19T10:30:00Z',
    budget: 35000,
    progress: 0
  },
  {
    id: '6',
    campaign_name: 'Opération Back to School',
    start_date: '2024-08-15',
    end_date: '2024-09-30',
    bags_printed: 0,
    bags_distributed: 0,
    status: 'pending',
    client_id: '5',
    client: { company_name: 'Adidas France', email: 'partnership@adidas.fr' },
    created_at: '2024-01-20T13:45:00Z',
    budget: 28000,
    progress: 0
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau client en attente',
    message: 'Nike France a soumis une demande d\'inscription',
    type: 'warning',
    read: false,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Campagne approuvée',
    message: 'La campagne "Promotion Été" a été approuvée',
    type: 'success',
    read: false,
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Problème d\'impression',
    message: 'Retard signalé sur l\'impression de la campagne "Tournoi de Football"',
    type: 'error',
    read: true,
    created_at: '2024-01-13T09:15:00Z'
  }
];

// Composant StatusBadge
function StatusBadge({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      active: { color: 'bg-emerald-100 text-emerald-800', label: 'Actif' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Suspendu' },
      approved: { color: 'bg-blue-100 text-blue-800', label: 'Approuvé' },
      printing: { color: 'bg-purple-100 text-purple-800', label: 'Impression' },
      distributed: { color: 'bg-indigo-100 text-indigo-800', label: 'Distribué' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Terminé' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Annulé' }
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const config = getStatusConfig(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

// Composant StatusSelector pour changer le statut des campagnes
function StatusSelector({ 
  currentStatus, 
  onStatusChange 
}: { 
  currentStatus: string;
  onStatusChange: (status: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const statusOptions = [
    { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: 'Approuvé', color: 'bg-blue-100 text-blue-800' },
    { value: 'printing', label: 'Impression', color: 'bg-purple-100 text-purple-800' },
    { value: 'distributed', label: 'Distribué', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'completed', label: 'Terminé', color: 'bg-gray-100 text-gray-800' },
    { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800' }
  ];

  const currentStatusConfig = statusOptions.find(opt => opt.value === currentStatus) || statusOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatusConfig.color} flex items-center gap-1 hover:opacity-80 transition-opacity`}
      >
        {currentStatusConfig.label}
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-30"
          >
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onStatusChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 ${
                  currentStatus === option.value ? 'bg-gray-50' : ''
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${option.color.split(' ')[0]}`} />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant ActionMenu
function ActionMenu({ item, onEdit, onDelete, onView }: { 
  item: any; 
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onView: (item: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-30"
          >
            <button
              onClick={() => { onView(item); setIsOpen(false); }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
            >
              <Eye className="w-4 h-4" />
              <span>Voir détails</span>
            </button>
            <button
              onClick={() => { onEdit(item); setIsOpen(false); }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
            >
              <Edit className="w-4 h-4" />
              <span>Modifier</span>
            </button>
            <button
              onClick={() => { onDelete(item); setIsOpen(false); }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3"
            >
              <Trash2 className="w-4 h-4" />
              <span>Supprimer</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant SearchBar
function SearchBar({ value, onChange, placeholder }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder={placeholder || "Rechercher..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-80 bg-white"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'create'>('view');

  // Simulation de chargement initial
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateStatus = async (table: string, id: string, status: string) => {
    if (table === 'clients') {
      setClients(prev => prev.map(client => 
        client.id === id ? { ...client, status } : client
      ));
    } else if (table === 'partners') {
      setPartners(prev => prev.map(partner => 
        partner.id === id ? { ...partner, status } : partner
      ));
    } else if (table === 'campaigns') {
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id ? { ...campaign, status } : campaign
      ));
    }
  };

  const updateCampaignStatus = (campaignId: string, newStatus: Campaign['status']) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
    ));
  };

  const deleteItem = async (table: string, id: string) => {
    if (table === 'clients') {
      setClients(prev => prev.filter(client => client.id !== id));
    } else if (table === 'partners') {
      setPartners(prev => prev.filter(partner => partner.id !== id));
    } else if (table === 'campaigns') {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    }
    setShowModal(false);
  };

  const handleView = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setModalType('delete');
    setShowModal(true);
  };

  const handleCreate = (type: string) => {
    setSelectedItem({ type });
    setModalType('create');
    setShowModal(true);
  };

  // Filtrage des données
  const filteredClients = clients.filter(client =>
    client.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact_person.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPartners = partners.filter(partner =>
    partner.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.business_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaign_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.client?.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistiques
  const pendingClients = clients.filter(c => c.status === 'pending').length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const pendingPartners = partners.filter(p => p.status === 'pending').length;
  const activePartners = partners.filter(p => p.status === 'active').length;
  const totalBagsPrinted = campaigns.reduce((sum, c) => sum + c.bags_printed, 0);
  const totalBagsDistributed = campaigns.reduce((sum, c) => sum + c.bags_distributed, 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const activeCampaigns = campaigns.filter(c => 
    ['approved', 'printing', 'distributed'].includes(c.status)
  ).length;
  const totalRevenue = clients.reduce((sum, c) => sum + (c.revenue || 0), 0);

  if (loading) {
    return (
      <DashboardLayout 
        title="Administration" 
        subtitle="Chargement en cours..."
      >
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Chargement des données...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Tableau de bord Admin"
      subtitle="Vue d'ensemble de la plateforme BagPresto"
    >
      {/* Barre de recherche et navigation */}
      <div className="flex items-center justify-between mb-8">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher clients, partenaires, campagnes..."
        />
        
        <div className="flex space-x-1 bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
          {['overview', 'clients', 'partners', 'campaigns'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab === 'overview' && 'Vue générale'}
              {tab === 'clients' && 'Clients'}
              {tab === 'partners' && 'Partenaires'}
              {tab === 'campaigns' && 'Campagnes'}
            </button>
          ))}
        </div>
      </div>

      {/* Vue générale */}
      {activeTab === 'overview' && (
        <>
          {/* Cartes de statistiques principales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{clients.length}</div>
                  <div className="text-sm text-gray-600">Clients totaux</div>
                  <div className="mt-2 text-xs text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {activeClients} actifs
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{partners.length}</div>
                  <div className="text-sm text-gray-600">Partenaires totaux</div>
                  <div className="mt-2 text-xs text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {activePartners} actifs
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{campaigns.length}</div>
                  <div className="text-sm text-gray-600">Campagnes totales</div>
                  <div className="mt-2 text-xs text-emerald-600">{activeCampaigns} actives</div>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{totalBagsPrinted.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sacs imprimés</div>
                  <div className="mt-2 text-xs text-blue-600">{totalBagsDistributed.toLocaleString()} distribués</div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cartes de revenus et indicateurs */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white lg:col-span-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Revenu total</p>
                  <div className="text-3xl font-bold mt-2">{totalRevenue.toLocaleString()} €</div>
                  <div className="flex items-center mt-2 text-emerald-100">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+12.5% ce mois</span>
                  </div>
                </div>
                <CreditCard className="w-12 h-12 text-emerald-200" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Performance</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Taux de conversion</span>
                    <span className="font-semibold text-emerald-600">4.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Satisfaction clients</span>
                    <span className="font-semibold text-emerald-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Clients en attente */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Clients en attente</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingClients}
                  </span>
                  <button 
                    onClick={() => handleCreate('client')}
                    className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {pendingClients === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun client en attente</p>
              ) : (
                <div className="space-y-4">
                  {clients.filter(c => c.status === 'pending').map((client, index) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{client.company_name}</h4>
                          <p className="text-sm text-gray-600">{client.sector}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                            <span className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {client.email}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {client.postal_code}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={client.status} />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus('clients', client.id, 'active')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approuver
                        </button>
                        <button
                          onClick={() => updateStatus('clients', client.id, 'suspended')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Refuser
                        </button>
                        <button
                          onClick={() => handleView(client, 'client')}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Partenaires en attente */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Partenaires en attente</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingPartners}
                  </span>
                  <button 
                    onClick={() => handleCreate('partner')}
                    className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {pendingPartners === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun partenaire en attente</p>
              ) : (
                <div className="space-y-4">
                  {partners.filter(p => p.status === 'pending').map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{partner.business_name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{partner.business_type}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {partner.city} - {partner.postal_code}
                            </span>
                            <span className="flex items-center">
                              <Package className="w-3 h-3 mr-1" />
                              {partner.capacity.toLocaleString()} sacs/mois
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={partner.status} />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus('partners', partner.id, 'active')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approuver
                        </button>
                        <button
                          onClick={() => updateStatus('partners', partner.id, 'suspended')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Refuser
                        </button>
                        <button
                          onClick={() => handleView(partner, 'partner')}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Campagnes récentes */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Campagnes récentes</h3>
              <button 
                onClick={() => handleCreate('campaign')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nouvelle campagne
              </button>
            </div>
            {campaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune campagne enregistrée</p>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign, index) => {
                  const client = campaign.client;
                  return (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{campaign.campaign_name}</h4>
                            <span className="text-lg font-bold text-emerald-600">
                              {campaign.budget.toLocaleString()} €
                            </span>
                          </div>
                          {client && <p className="text-sm text-gray-600 mb-3">{client.company_name}</p>}
                          
                          {/* Barre de progression */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progression</span>
                              <span>{campaign.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${campaign.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(campaign.start_date).toLocaleDateString('fr-FR')}
                            </span>
                            <span>→</span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(campaign.end_date).toLocaleDateString('fr-FR')}
                            </span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Package className="w-3 h-3 mr-1" />
                              {campaign.bags_printed.toLocaleString()} sacs
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <StatusSelector
                            currentStatus={campaign.status}
                            onStatusChange={(newStatus) => updateCampaignStatus(campaign.id, newStatus as Campaign['status'])}
                          />
                          <ActionMenu
                            item={campaign}
                            onEdit={(item) => handleEdit(item, 'campaign')}
                            onDelete={(item) => handleDelete(item, 'campaign')}
                            onView={(item) => handleView(item, 'campaign')}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Vue Clients */}
      {activeTab === 'clients' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestion des clients</h2>
                <p className="text-gray-600 mt-1">{clients.length} clients au total</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filtres
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <button 
                  onClick={() => handleCreate('client')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau client
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Entreprise</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Secteur</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{client.company_name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        {client.sector}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-900">{client.contact_person}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(client.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-6">
                      <ActionMenu
                        item={client}
                        onEdit={(item) => handleEdit(item, 'client')}
                        onDelete={(item) => handleDelete(item, 'client')}
                        onView={(item) => handleView(item, 'client')}
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vue Partenaires */}
      {activeTab === 'partners' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestion des partenaires</h2>
                <p className="text-gray-600 mt-1">{partners.length} partenaires au total</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filtres
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <button 
                  onClick={() => handleCreate('partner')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau partenaire
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Entreprise</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Localisation</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Capacité</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Note</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner, index) => (
                  <motion.tr
                    key={partner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{partner.business_name}</p>
                        <p className="text-sm text-gray-600">{partner.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 capitalize">{partner.business_type}</td>
                    <td className="py-4 px-6">
                      <p className="text-gray-900">{partner.city}</p>
                      <p className="text-sm text-gray-600">{partner.postal_code}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">
                        {partner.capacity.toLocaleString()} sacs/mois
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(partner.rating / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={partner.status} />
                    </td>
                    <td className="py-4 px-6">
                      <ActionMenu
                        item={partner}
                        onEdit={(item) => handleEdit(item, 'partner')}
                        onDelete={(item) => handleDelete(item, 'partner')}
                        onView={(item) => handleView(item, 'partner')}
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vue Campagnes */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestion des campagnes</h2>
                <p className="text-gray-600 mt-1">{campaigns.length} campagnes au total</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filtres
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <button 
                  onClick={() => handleCreate('campaign')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle campagne
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Campagne</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Client</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Période</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Sacs</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Budget</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Progression</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{campaign.campaign_name}</p>
                        <p className="text-sm text-gray-600">
                          Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-900">{campaign.client?.company_name}</p>
                      <p className="text-sm text-gray-600">{campaign.client?.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="text-gray-900">
                          {new Date(campaign.start_date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-gray-600">au</p>
                        <p className="text-gray-900">
                          {new Date(campaign.end_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {campaign.bags_printed.toLocaleString()} imprimés
                        </p>
                        <p className="text-gray-600">
                          {campaign.bags_distributed.toLocaleString()} distribués
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-emerald-600">
                        {campaign.budget.toLocaleString()} €
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-24">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{campaign.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusSelector
                        currentStatus={campaign.status}
                        onStatusChange={(newStatus) => updateCampaignStatus(campaign.id, newStatus as Campaign['status'])}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <ActionMenu
                        item={campaign}
                        onEdit={(item) => handleEdit(item, 'campaign')}
                        onDelete={(item) => handleDelete(item, 'campaign')}
                        onView={(item) => handleView(item, 'campaign')}
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === 'view' && selectedItem && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Détails</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedItem).map(([key, value]) => (
                      key !== 'type' && (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium text-gray-700 capitalize">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="text-gray-900">
                            {typeof value === 'string' ? value : JSON.stringify(value)}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'delete' && selectedItem && (
                <div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmer la suppression</h3>
                  <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer {selectedItem.company_name || selectedItem.business_name || selectedItem.campaign_name} ? 
                    Cette action est irréversible.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => deleteItem(selectedItem.type, selectedItem.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}

              {(modalType === 'edit' || modalType === 'create') && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {modalType === 'create' ? 'Créer' : 'Modifier'} {selectedItem?.type}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {modalType === 'create' 
                      ? `Ajouter un nouveau ${selectedItem?.type} à la plateforme`
                      : `Modifier les informations du ${selectedItem?.type}`
                    }
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder={`Entrez le nom du ${selectedItem?.type}`}
                        defaultValue={modalType === 'edit' ? selectedItem.company_name || selectedItem.business_name || selectedItem.campaign_name : ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                        placeholder="Entrez une description"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium"
                    >
                      {modalType === 'create' ? 'Créer' : 'Sauvegarder'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}