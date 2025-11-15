// pages/ClientDashboard.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  TrendingUp, 
  MapPin, 
  Plus, 
  Calendar,
  Users,
  Eye,
  FileText,
  Settings,
  CreditCard,
  Upload,
  X,
  Check,
  Building2,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Download,
  BarChart3,
  Target,
  Zap,
  Star,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Info,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Image,
  Palette,
  Layout,
  DollarSign,
  BadgeCheck,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Types pour les données simulées
interface Campaign {
  id: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  bags_printed: number;
  status: 'pending' | 'approved' | 'printing' | 'distributed' | 'completed';
  budget: number;
  roi: number;
  partners_count: number;
}

interface Client {
  id: string;
  company_name: string;
  sector: string;
  postal_code: string;
  message?: string;
  status: 'pending' | 'active';
  email: string;
  phone?: string;
  full_name: string;
}

interface Partner {
  id: string;
  name: string;
  type: string;
  address: string;
  postal_code: string;
  monthly_volume: number;
  eco_engagement: string;
  status: 'active' | 'inactive';
  distance?: number;
  rating?: number;
}

interface Invoice {
  id: string;
  campaign_name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  download_url: string;
}

// Composant de carte de partenaire amélioré
const PartnerCard = ({ 
  partner, 
  selected, 
  onSelect 
}: { 
  partner: Partner; 
  selected: boolean; 
  onSelect: (id: string) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100'
          : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
      }`}
      onClick={() => onSelect(partner.id)}
    >
      {/* Badge de sélection */}
      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
        selected ? 'bg-emerald-500 scale-100' : 'bg-gray-300 scale-0'
      }`}>
        <Check className="w-3 h-3 text-white" />
      </div>

      <div className="flex gap-4">
        {/* Avatar du partenaire */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {partner.name.charAt(0)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-bold text-gray-900 truncate">{partner.name}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {partner.address}
              </p>
            </div>
            {partner.rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-semibold text-yellow-700">{partner.rating}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {partner.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {partner.monthly_volume.toLocaleString()} sacs/mois
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <BadgeCheck className="w-4 h-4" />
              {partner.eco_engagement}
            </span>
            {partner.distance && (
              <span className="text-gray-500">{partner.distance}km</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant d'étape avec indicateur de progression
const StepIndicator = ({ 
  step, 
  currentStep, 
  title,
  icon: Icon 
}: { 
  step: number; 
  currentStep: number; 
  title: string;
  icon: any;
}) => {
  const isCompleted = step < currentStep;
  const isCurrent = step === currentStep;
  const isUpcoming = step > currentStep;

  return (
    <div className="flex items-center gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        isCompleted
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : isCurrent
          ? 'border-emerald-500 bg-white text-emerald-500'
          : 'border-gray-300 bg-white text-gray-400'
      }`}>
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-semibold transition-colors ${
          isCompleted || isCurrent ? 'text-emerald-600' : 'text-gray-400'
        }`}>
          Étape {step}
        </div>
        <div className={`font-medium transition-colors ${
          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
        }`}>
          {title}
        </div>
      </div>
      {step < 4 && (
        <div className={`w-8 h-0.5 transition-colors ${
          isCompleted ? 'bg-emerald-500' : 'bg-gray-300'
        }`} />
      )}
    </div>
  );
};

// Composant de carte de fonctionnalité
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  active,
  onClick 
}: { 
  icon: any; 
  title: string; 
  description: string;
  active: boolean;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
      active
        ? 'border-emerald-500 bg-emerald-50 shadow-lg'
        : 'border-gray-200 hover:border-emerald-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg transition-colors ${
        active ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold ${
            active ? 'text-emerald-700' : 'text-gray-900'
          }`}>
            {title}
          </h4>
          {active && (
            <Check className="w-4 h-4 text-emerald-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function ClientDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // États pour la création de campagne
  const [campaignCreation, setCampaignCreation] = useState(false);
  const [campaignStep, setCampaignStep] = useState(1);
  const [campaignForm, setCampaignForm] = useState({
    postal_code: '',
    selected_partners: [] as string[],
    company_name: '',
    sector: '',
    message: '',
    logo: null as File | null,
    use_custom_logo: false,
    placement: {
      both_faces: false,
      multiple_positions: false,
      positions_count: 1,
      exclusive_sector: false
    },
    bag_quantity: 1000,
    payment_method: '',
    campaign_name: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Prix de base
  const BASE_PRICE = 80;

  // Calcul des suppléments
  const calculateSupplements = () => {
    let supplements = 0;
    
    if (campaignForm.use_custom_logo) supplements += 20;
    if (campaignForm.placement.both_faces) supplements += 30;
    if (campaignForm.placement.multiple_positions) {
      supplements += (campaignForm.placement.positions_count - 1) * 15;
    }
    if (campaignForm.placement.exclusive_sector) supplements += 50;
    
    return supplements;
  };

  const calculateTotalPrice = () => {
    const baseCost = (campaignForm.bag_quantity / 1000) * BASE_PRICE;
    const supplements = calculateSupplements();
    return baseCost + supplements;
  };

  // Gestion du téléchargement de logo
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 2 Mo)');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }
      
      setCampaignForm(prev => ({ ...prev, logo: file }));
      
      // Créer une preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setCampaignForm(prev => ({ ...prev, logo: null }));
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulation de données
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const clientData: Client = {
        id: '1',
        company_name: user?.user_metadata?.full_name || 'Mon Entreprise',
        sector: 'Restaurant',
        postal_code: '76000',
        message: 'Venez découvrir nos spécialités normandes',
        status: 'active',
        email: user?.email || 'contact@entreprise.com',
        phone: '+33 6 12 34 56 78',
        full_name: user?.user_metadata?.full_name || 'Directeur'
      };
      
      const campaignsData: Campaign[] = [
        {
          id: '1',
          campaign_name: 'Campagne Printemps 2024',
          start_date: '2024-03-01',
          end_date: '2024-04-01',
          bags_printed: 2500,
          status: 'completed',
          budget: 299,
          roi: 245,
          partners_count: 8
        },
        {
          id: '2',
          campaign_name: 'Campagne Été 2024',
          start_date: '2024-06-01',
          end_date: '2024-07-01',
          bags_printed: 1800,
          status: 'distributed',
          budget: 199,
          roi: 189,
          partners_count: 6
        }
      ];
      
      const partnersData: Partner[] = [
        {
          id: '1',
          name: 'Boulangerie du Centre',
          type: 'Boulangerie',
          address: '15 Rue de la République, Rouen',
          postal_code: '76000',
          monthly_volume: 3000,
          eco_engagement: 'Commerce engagé',
          status: 'active',
          distance: 0.5,
          rating: 4.8
        },
        {
          id: '2',
          name: 'Superette Market',
          type: 'Supermarché',
          address: '42 Avenue des Fleurs, Caen',
          postal_code: '14000',
          monthly_volume: 5000,
          eco_engagement: 'Développement durable',
          status: 'active',
          distance: 1.2,
          rating: 4.6
        },
        {
          id: '3',
          name: 'Pharmacie Centrale',
          type: 'Pharmacie',
          address: '8 Place du Marché, Le Havre',
          postal_code: '76600',
          monthly_volume: 2000,
          eco_engagement: 'Santé et environnement',
          status: 'active',
          distance: 0.8,
          rating: 4.9
        },
        {
          id: '4',
          name: 'Primeurs du Marché',
          type: 'Primeur',
          address: '25 Rue des Halles, Rouen',
          postal_code: '76000',
          monthly_volume: 2500,
          eco_engagement: 'Produits locaux',
          status: 'active',
          distance: 0.3,
          rating: 4.7
        },
        {
          id: '5',
          name: 'Librairie Page',
          type: 'Librairie',
          address: '7 Rue de la Romaine, Caen',
          postal_code: '14000',
          monthly_volume: 1500,
          eco_engagement: 'Culture locale',
          status: 'active',
          distance: 1.5,
          rating: 4.5
        }
      ];

      const invoicesData: Invoice[] = [
        {
          id: 'INV-001',
          campaign_name: 'Campagne Printemps 2024',
          amount: 299,
          date: '2024-03-01',
          status: 'paid',
          download_url: '#'
        },
        {
          id: 'INV-002',
          campaign_name: 'Campagne Été 2024',
          amount: 199,
          date: '2024-06-01',
          status: 'paid',
          download_url: '#'
        }
      ];

      setTimeout(() => {
        setClient(clientData);
        setCampaigns(campaignsData);
        setPartners(partnersData);
        setInvoices(invoicesData);
        setLoading(false);
      }, 1500);
    };

    if (user) {
      fetchData();
    } else {
      navigate('/client');
    }
  }, [user, navigate]);

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client) {
      alert('Erreur: Client non trouvé');
      return;
    }

    try {
      const newCampaign: Campaign = {
        id: Math.random().toString(36).substr(2, 9),
        campaign_name: campaignForm.campaign_name || `Campagne ${new Date().toLocaleDateString('fr-FR')}`,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        bags_printed: 0,
        status: 'pending',
        budget: calculateTotalPrice(),
        roi: 0,
        partners_count: campaignForm.selected_partners.length
      };

      setCampaigns(prev => [newCampaign, ...prev]);
      
      // Réinitialiser le formulaire
      setCampaignCreation(false);
      setCampaignStep(1);
      setCampaignForm({
        postal_code: '',
        selected_partners: [],
        company_name: '',
        sector: '',
        message: '',
        logo: null,
        use_custom_logo: false,
        placement: {
          both_faces: false,
          multiple_positions: false,
          positions_count: 1,
          exclusive_sector: false
        },
        bag_quantity: 1000,
        payment_method: '',
        campaign_name: ''
      });
      setLogoPreview(null);
      
      alert('Campagne créée avec succès ! Notre équipe va la valider sous 24h.');
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Une erreur est survenue lors de la création de la campagne');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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

  const getInvoiceStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-emerald-100 text-emerald-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Chargement de votre espace client...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Impossible de charger vos données client</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const totalBagsPrinted = campaigns.reduce((sum, c) => sum + c.bags_printed, 0);
  const activeCampaigns = campaigns.filter(c => ['approved', 'printing', 'distributed'].includes(c.status)).length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
  const totalPartners = partners.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BagPresto</h1>
                <p className="text-xs text-emerald-600">Espace Client</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Bonjour, {client.full_name}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation par onglets */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
              { id: 'campaigns', label: 'Mes campagnes', icon: Target },
              { id: 'invoices', label: 'Factures', icon: FileText },
              { id: 'profile', label: 'Profil', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tableau de bord principal */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600 mt-2">Bienvenue dans votre espace client BagPresto</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                <div className="text-sm text-gray-600">Sacs distribués</div>
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
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalPartners}</div>
                <div className="text-sm text-gray-600">Partenaires actifs</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {campaigns.length > 0 ? Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length) : 0}%
                </div>
                <div className="text-sm text-gray-600">ROI moyen</div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Campagnes récentes</h3>
                  <button 
                    onClick={() => setActiveTab('campaigns')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Voir tout
                  </button>
                </div>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{campaign.campaign_name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(campaign.start_date).toLocaleDateString('fr-FR')}
                          </span>
                          <span>{campaign.bags_printed.toLocaleString()} sacs</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {campaign.roi > 0 && (
                          <span className="text-sm font-medium text-emerald-600">
                            +{campaign.roi}% ROI
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusLabel(campaign.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {campaigns.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune campagne pour le moment</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-6">Lancez une nouvelle campagne</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-emerald-200 mt-0.5" />
                    <div>
                      <div className="font-semibold">Déploiement rapide</div>
                      <div className="text-emerald-200 text-sm">Campagne active en 2-3 semaines</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-emerald-200 mt-0.5" />
                    <div>
                      <div className="font-semibold">Ciblage précis</div>
                      <div className="text-emerald-200 text-sm">Atteignez votre audience locale</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-200 mt-0.5" />
                    <div>
                      <div className="font-semibold">ROI garanti</div>
                      <div className="text-emerald-200 text-sm">+250% de visibilité en moyenne</div>
                    </div>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab('campaigns');
                    setCampaignCreation(true);
                  }}
                  className="w-full bg-white text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle campagne
                </motion.button>
              </motion.div>
            </div>
          </>
        )}

        {/* Page Mes campagnes avec formulaire ULTRA PRO */}
        {activeTab === 'campaigns' && (
          <div className="space-y-8">
            {/* En-tête */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Mes campagnes</h3>
                <p className="text-gray-600 mt-1">Gérez et créez vos campagnes publicitaires</p>
              </div>
              {!campaignCreation && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCampaignCreation(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:from-emerald-700 hover:to-green-600 transition-all shadow-lg shadow-emerald-500/25 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Nouvelle campagne
                </motion.button>
              )}
            </div>

            {/* Formulaire de création ULTRA PRO */}
            {campaignCreation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                {/* En-tête du formulaire */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Créer une nouvelle campagne
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Remplissez les informations pour lancer votre campagne publicitaire
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setCampaignCreation(false);
                      setCampaignStep(1);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Indicateurs d'étapes verticaux */}
                <div className="grid lg:grid-cols-4 gap-8 mb-8">
                  <StepIndicator 
                    step={1} 
                    currentStep={campaignStep} 
                    title="Zone de distribution" 
                    icon={MapPin}
                  />
                  <StepIndicator 
                    step={2} 
                    currentStep={campaignStep} 
                    title="Partenaires" 
                    icon={Users}
                  />
                  <StepIndicator 
                    step={3} 
                    currentStep={campaignStep} 
                    title="Personnalisation" 
                    icon={Palette}
                  />
                  <StepIndicator 
                    step={4} 
                    currentStep={campaignStep} 
                    title="Paiement" 
                    icon={CreditCard}
                  />
                </div>

                {/* Barre de progression horizontale */}
                <div className="mb-8">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                          step < campaignStep 
                            ? 'bg-emerald-500' 
                            : step === campaignStep 
                            ? 'bg-emerald-300'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Zone</span>
                    <span>Partenaires</span>
                    <span>Personnalisation</span>
                    <span>Paiement</span>
                  </div>
                </div>

                {/* Étape 1: Zone de distribution */}
                {campaignStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-2xl font-bold text-gray-900 mb-2">Zone de distribution</h5>
                      <p className="text-gray-600 text-lg">Où souhaitez-vous distribuer vos sacs publicitaires ?</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Code postal de distribution *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={campaignForm.postal_code}
                              onChange={(e) => setCampaignForm(prev => ({ 
                                ...prev, 
                                postal_code: e.target.value.replace(/\D/g, '').slice(0, 5)
                              }))}
                              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                              placeholder="76000"
                              maxLength={5}
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              <MapPin className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Saisissez un code postal normand (14, 27, 50, 61, 76)
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Couverture estimée
                          </h6>
                          <div className="space-y-2 text-sm text-blue-800">
                            <div className="flex justify-between">
                              <span>Foyers couverts :</span>
                              <span className="font-semibold">1,250 foyers</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Commerces partenaires :</span>
                              <span className="font-semibold">8 commerces</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Portée mensuelle :</span>
                              <span className="font-semibold">~15,000 personnes</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h6 className="font-semibold text-gray-900 mb-4">📈 Impact dans votre zone</h6>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <Target className="w-8 h-8 text-emerald-600" />
                            <div>
                              <div className="font-semibold">Ciblage géographique précis</div>
                              <div className="text-sm text-gray-600">Atteignez votre audience locale</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                            <div>
                              <div className="font-semibold">Consommateurs engagés</div>
                              <div className="text-sm text-gray-600">Clients réguliers des commerces locaux</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <TrendingUp className="w-8 h-8 text-purple-600" />
                            <div>
                              <div className="font-semibold">ROI optimisé</div>
                              <div className="text-sm text-gray-600">+250% de visibilité en moyenne</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t">
                      <div></div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(2)}
                        disabled={!campaignForm.postal_code || campaignForm.postal_code.length !== 5}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:from-emerald-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/25 font-semibold flex items-center gap-3"
                      >
                        Continuer vers les partenaires
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Étape 2: Choix des partenaires */}
                {campaignStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-2xl font-bold text-gray-900 mb-2">
                        Sélection des commerces partenaires
                      </h5>
                      <p className="text-gray-600 text-lg">
                        Choisissez les commerces qui distribueront vos sacs
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mt-3">
                        <Users className="w-4 h-4" />
                        {campaignForm.selected_partners.length} commerce(s) sélectionné(s)
                      </div>
                    </div>

                    {/* Filtres et recherche */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex-1 min-w-[300px]">
                        <div className="relative">
                          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Rechercher un commerce..."
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      <select className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option>Tous les types</option>
                        <option>Boulangerie</option>
                        <option>Supermarché</option>
                        <option>Pharmacie</option>
                      </select>
                      <select className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option>Trier par</option>
                        <option>Distance</option>
                        <option>Volume mensuel</option>
                        <option>Note</option>
                      </select>
                    </div>

                    {/* Liste des partenaires */}
                    <div className="grid gap-4 max-h-[500px] overflow-y-auto p-4 border-2 border-gray-100 rounded-2xl">
                      {partners.map((partner) => (
                        <PartnerCard
                          key={partner.id}
                          partner={partner}
                          selected={campaignForm.selected_partners.includes(partner.id)}
                          onSelect={(id) => {
                            const newSelection = campaignForm.selected_partners.includes(id)
                              ? campaignForm.selected_partners.filter(partnerId => partnerId !== id)
                              : [...campaignForm.selected_partners, id];
                            setCampaignForm(prev => ({ ...prev, selected_partners: newSelection }));
                          }}
                        />
                      ))}
                    </div>

                    {/* Résumé de sélection */}
                    {campaignForm.selected_partners.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6"
                      >
                        <h6 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Excellent choix !
                        </h6>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">
                              {campaignForm.selected_partners.length}
                            </div>
                            <div className="text-emerald-700">Commerces sélectionnés</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">
                              {partners
                                .filter(p => campaignForm.selected_partners.includes(p.id))
                                .reduce((sum, p) => sum + p.monthly_volume, 0)
                                .toLocaleString()}
                            </div>
                            <div className="text-emerald-700">Sacs distribués/mois</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">
                              {Math.round(partners
                                .filter(p => campaignForm.selected_partners.includes(p.id))
                                .reduce((sum, p) => sum + (p.rating || 0), 0) / campaignForm.selected_partners.length * 10) / 10}
                            </div>
                            <div className="text-emerald-700">Note moyenne</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between pt-8 border-t">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(1)}
                        className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center gap-3"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Retour
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(3)}
                        disabled={campaignForm.selected_partners.length === 0}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:from-emerald-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/25 font-semibold flex items-center gap-3"
                      >
                        Personnaliser ma campagne
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3: Personnalisation */}
                {campaignStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-2xl font-bold text-gray-900 mb-2">Personnalisation</h5>
                      <p className="text-gray-600 text-lg">Donnez vie à votre campagne publicitaire</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {/* Informations de base */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            Informations de l'entreprise
                          </h6>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom de l'entreprise *
                              </label>
                              <input
                                type="text"
                                required
                                value={campaignForm.company_name}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  company_name: e.target.value 
                                }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Votre entreprise"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Secteur d'activité *
                              </label>
                              <input
                                type="text"
                                required
                                value={campaignForm.sector}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  sector: e.target.value 
                                }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Restaurant, Commerce..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom de la campagne
                              </label>
                              <input
                                type="text"
                                value={campaignForm.campaign_name}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  campaign_name: e.target.value 
                                }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Ma campagne printemps 2024"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message publicitaire
                              </label>
                              <textarea
                                value={campaignForm.message}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  message: e.target.value 
                                }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                rows={3}
                                placeholder="Votre message accrocheur..."
                                maxLength={200}
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                {campaignForm.message.length}/200 caractères
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Options de personnalisation */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Layout className="w-5 h-5 text-blue-600" />
                            Options d'impression
                          </h6>
                          <div className="space-y-4">
                            <FeatureCard
                              icon={Image}
                              title="Logo personnalisé"
                              description="Ajoutez votre logo pour une meilleure reconnaissance de marque"
                              active={campaignForm.use_custom_logo}
                              onClick={() => setCampaignForm(prev => ({ 
                                ...prev, 
                                use_custom_logo: !prev.use_custom_logo 
                              }))}
                            />

                            {campaignForm.use_custom_logo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-gray-50 rounded-xl p-4"
                              >
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Télécharger votre logo
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                  <div className="flex-1">
                                    <label className="cursor-pointer">
                                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors group">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-emerald-500" />
                                        <p className="text-sm text-gray-600 group-hover:text-emerald-700">
                                          Cliquez pour télécharger
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          PNG, JPG, SVG - Max 2 Mo
                                        </p>
                                      </div>
                                      <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                  {logoPreview && (
                                    <div className="flex flex-col items-center gap-2">
                                      <div className="w-20 h-20 border-2 border-emerald-200 rounded-lg overflow-hidden bg-white p-2">
                                        <img 
                                          src={logoPreview} 
                                          alt="Logo preview" 
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="text-xs text-red-600 hover:text-red-700"
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}

                            <FeatureCard
                              icon={Layout}
                              title="Impression sur les deux faces"
                              description="Doublez votre visibilité avec une impression recto-verso"
                              active={campaignForm.placement.both_faces}
                              onClick={() => setCampaignForm(prev => ({ 
                                ...prev, 
                                placement: {
                                  ...prev.placement,
                                  both_faces: !prev.placement.both_faces
                                }
                              }))}
                            />

                            <FeatureCard
                              icon={Target}
                              title="Secteur exclusif"
                              description="Seul annonceur de votre secteur sur le sac"
                              active={campaignForm.placement.exclusive_sector}
                              onClick={() => setCampaignForm(prev => ({ 
                                ...prev, 
                                placement: {
                                  ...prev.placement,
                                  exclusive_sector: !prev.placement.exclusive_sector
                                }
                              }))}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Quantité de sacs */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Package className="w-5 h-5 text-orange-600" />
                            Quantité de sacs
                          </h6>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Quantité</span>
                              <span className="text-lg font-bold text-gray-900">
                                {campaignForm.bag_quantity.toLocaleString()} sacs
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1000"
                              max="10000"
                              step="1000"
                              value={campaignForm.bag_quantity}
                              onChange={(e) => setCampaignForm(prev => ({ 
                                ...prev, 
                                bag_quantity: Number(e.target.value) 
                              }))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>1,000</span>
                              <span>5,000</span>
                              <span>10,000</span>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-sm text-blue-700 text-center">
                                💡 <strong>Optimisation :</strong> {campaignForm.bag_quantity} sacs couvriront environ{' '}
                                {Math.round(campaignForm.bag_quantity * 1.5).toLocaleString()} impressions mensuelles
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Récapitulatif des prix en temps réel */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white sticky top-4">
                          <h6 className="font-semibold text-xl mb-6 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            Récapitulatif
                          </h6>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Base ({campaignForm.bag_quantity.toLocaleString()} sacs)</span>
                              <span>{((campaignForm.bag_quantity / 1000) * BASE_PRICE).toFixed(2)}€</span>
                            </div>
                            
                            {calculateSupplements() > 0 && (
                              <div className="border-t border-gray-700 pt-3">
                                <div className="text-xs text-gray-400 mb-2">Suppléments :</div>
                                {campaignForm.use_custom_logo && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Logo personnalisé</span>
                                    <span className="text-emerald-400">+20.00€</span>
                                  </div>
                                )}
                                {campaignForm.placement.both_faces && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Deux faces</span>
                                    <span className="text-emerald-400">+30.00€</span>
                                  </div>
                                )}
                                {campaignForm.placement.exclusive_sector && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Secteur exclusif</span>
                                    <span className="text-emerald-400">+50.00€</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="border-t border-gray-700 pt-3">
                              <div className="flex justify-between font-bold text-lg">
                                <span>Total TTC</span>
                                <span className="text-emerald-400">{calculateTotalPrice().toFixed(2)}€</span>
                              </div>
                            </div>

                            {/* Économies et avantages */}
                            <div className="bg-emerald-500/20 rounded-lg p-3 mt-4">
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span>Inclus : Design, Impression et Distribution</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(2)}
                        className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center gap-3"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Retour aux partenaires
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(4)}
                        disabled={!campaignForm.company_name || !campaignForm.sector}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:from-emerald-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/25 font-semibold flex items-center gap-3"
                      >
                        Procéder au paiement
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Étape 4: Paiement */}
                {campaignStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-2xl font-bold text-gray-900 mb-2">Paiement sécurisé</h5>
                      <p className="text-gray-600 text-lg">Finalisez votre campagne en toute sécurité</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {/* Méthodes de paiement */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            Méthode de paiement
                          </h6>
                          <div className="space-y-3">
                            <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 transition-all has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                              <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={campaignForm.payment_method === 'card'}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  payment_method: e.target.value 
                                }))}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              <CreditCard className="w-6 h-6 text-gray-600" />
                              <div className="flex-1">
                                <div className="font-semibold">Carte bancaire</div>
                                <div className="text-sm text-gray-600">Paiement sécurisé instantané</div>
                              </div>
                              <div className="flex gap-1">
                                <div className="w-8 h-5 bg-blue-500 rounded-sm"></div>
                                <div className="w-8 h-5 bg-yellow-500 rounded-sm"></div>
                                <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                              </div>
                            </label>

                            <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 transition-all has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                              <input
                                type="radio"
                                name="payment"
                                value="transfer"
                                checked={campaignForm.payment_method === 'transfer'}
                                onChange={(e) => setCampaignForm(prev => ({ 
                                  ...prev, 
                                  payment_method: e.target.value 
                                }))}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              <Building2 className="w-6 h-6 text-gray-600" />
                              <div className="flex-1">
                                <div className="font-semibold">Virement bancaire</div>
                                <div className="text-sm text-gray-600">Paiement sous 48h</div>
                              </div>
                            </label>
                          </div>

                          {/* Formulaire de carte */}
                          {campaignForm.payment_method === 'card' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-6 p-4 bg-gray-50 rounded-xl space-y-4"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Numéro de carte
                                </label>
                                <input
                                  type="text"
                                  placeholder="1234 5678 9012 3456"
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date d'expiration
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="MM/AA"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Garanties de sécurité */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            Paiement 100% sécurisé
                          </h6>
                          <div className="grid grid-cols-2 gap-4 text-sm text-green-800">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Chiffrement SSL</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>3D Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Données protégées</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Certifié PCI DSS</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Récapitulatif final */}
                      <div className="space-y-6">
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                          <h6 className="font-semibold text-gray-900 mb-4">Récapitulatif final</h6>
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold">Campagne publicitaire</div>
                                <div className="text-sm text-gray-600">
                                  {campaignForm.bag_quantity.toLocaleString()} sacs • {campaignForm.selected_partners.length} partenaires
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{calculateTotalPrice().toFixed(2)}€</div>
                                <div className="text-sm text-gray-600">TTC</div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Total à payer</span>
                                <span className="text-emerald-600">{calculateTotalPrice().toFixed(2)}€</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bouton de confirmation */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCampaignSubmit}
                          disabled={!campaignForm.payment_method}
                          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3"
                        >
                          <Shield className="w-5 h-5" />
                          Confirmer le paiement de {calculateTotalPrice().toFixed(2)}€
                          <CheckCircle className="w-5 h-5" />
                        </motion.button>

                        <div className="text-center">
                          <p className="text-xs text-gray-500">
                            En confirmant, vous acceptez nos{' '}
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
                              conditions générales
                            </a>{' '}
                            et notre{' '}
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
                              politique de confidentialité
                            </a>
                          </p>
                        </div>

                        {/* Avantages inclus */}
                        <div className="bg-blue-50 rounded-2xl p-4">
                          <h6 className="font-semibold text-blue-900 mb-3 text-center">
                            ✅ Tout inclus dans votre campagne
                          </h6>
                          <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Design professionnel</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Impression qualité</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Distribution garantie</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Support 7j/7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCampaignStep(3)}
                        className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center gap-3"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Retour à la personnalisation
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Liste des campagnes existantes */}
            {!campaignCreation && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {campaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune campagne pour le moment</p>
                    <p className="text-sm text-gray-500">Créez votre première campagne pour commencer</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 font-semibold text-gray-900">Campagne</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Statut</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Début</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Fin</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Sacs</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Budget</th>
                          <th className="text-left py-4 font-semibold text-gray-900">ROI</th>
                          <th className="text-left py-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 font-semibold">{campaign.campaign_name}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                {getStatusLabel(campaign.status)}
                              </span>
                            </td>
                            <td className="py-4 text-gray-600">
                              {new Date(campaign.start_date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-4 text-gray-600">
                              {new Date(campaign.end_date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-4 text-gray-600">{campaign.bags_printed.toLocaleString()}</td>
                            <td className="py-4 text-gray-600">{campaign.budget}€</td>
                            <td className="py-4">
                              {campaign.roi > 0 ? (
                                <span className="text-emerald-600 font-semibold">+{campaign.roi}%</span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-4">
                              <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                                Voir détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Page Factures */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Mes factures</h3>
                <p className="text-gray-600 mt-1">Historique et gestion de vos factures</p>
              </div>
            </div>

            {invoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Aucune facture pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 font-semibold text-gray-900">N° Facture</th>
                      <th className="text-left py-4 font-semibold text-gray-900">Campagne</th>
                      <th className="text-left py-4 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-4 font-semibold text-gray-900">Montant</th>
                      <th className="text-left py-4 font-semibold text-gray-900">Statut</th>
                      <th className="text-left py-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 font-semibold">{invoice.id}</td>
                        <td className="py-4 text-gray-600">{invoice.campaign_name}</td>
                        <td className="py-4 text-gray-600">
                          {new Date(invoice.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 font-semibold">{invoice.amount}€</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                            {invoice.status === 'paid' ? 'Payée' : invoice.status === 'pending' ? 'En attente' : 'En retard'}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                            <Download className="w-4 h-4" />
                            Télécharger
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Page Profil */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de l'entreprise</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={client.company_name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    Secteur d'activité
                  </label>
                  <input
                    type="text"
                    value={client.sector}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={client.postal_code}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={client.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={client.phone || 'Non renseigné'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    readOnly
                  />
                </div>
                {client.message && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      Message publicitaire
                    </label>
                    <textarea
                      value={client.message}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                      rows={4}
                      readOnly
                    />
                  </div>
                )}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Statut du compte
                  </label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status === 'active' ? 'Actif' : 'En attente de validation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}