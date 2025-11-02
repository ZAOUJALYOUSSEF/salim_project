import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Menu, X, LogIn, LayoutDashboard, LogOut, User, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 4px 20px rgba(0, 0, 0, 0.1)']
  );

  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(255, 255, 255)', 'rgb(17, 24, 39)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand la fenêtre est redimensionnée au-dessus de lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Concept', id: 'concept' },
    { label: 'Avantages', id: 'features' },
    { label: 'Calculateur', id: 'calculator' },
    { label: 'Témoignages', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <motion.header
      style={{
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-600/30">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1 
                style={{ color: textColor }}
                className="text-xl sm:text-2xl font-black"
              >
                BagPresto
              </motion.h1>
              <p className="text-xs text-emerald-600 font-semibold">
                Normandie
              </p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-semibold transition-colors relative group text-sm xl:text-base"
                style={{ color: textColor }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-emerald-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {user && profile ? (
              <>
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors border-2 border-emerald-200 text-sm xl:text-base"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </motion.button>

                <div className="flex items-center gap-2 px-3 py-2 xl:px-4 xl:py-2.5 bg-gray-100 rounded-xl">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-900 max-w-32 truncate">
                    {profile.full_name}
                  </span>
                </div>

                <motion.button
                  onClick={signOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => navigate('/client')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-all text-sm xl:text-base"
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </motion.button>

                <motion.button
                  onClick={() => navigate('/client')}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-2.5 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all text-sm xl:text-base"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden xl:inline">Lancer ma campagne</span>
                  <span className="xl:hidden">Commencer</span>
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}

            <div className="pt-3 space-y-2 border-t border-gray-200">
              {user && profile ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-900">{profile.full_name}</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Mon Dashboard
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => {
                      navigate('/client');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-emerald-600 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn className="w-5 h-5" />
                    Connexion
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      navigate('/client');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl font-bold shadow-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Lancer ma campagne
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}