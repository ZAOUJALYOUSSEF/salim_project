import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BagPresto</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre marque dans les mains de la Normandie. Publicité éco-responsable sur sacs réutilisables.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#concept" className="hover:text-emerald-400 transition-colors">Le concept</a></li>
              <li><a href="#clients" className="hover:text-emerald-400 transition-colors">Pour les annonceurs</a></li>
              <li><a href="#partenaires" className="hover:text-emerald-400 transition-colors">Pour les partenaires</a></li>
              <li><a href="#carte" className="hover:text-emerald-400 transition-colors">Carte interactive</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:contact@bagpresto.fr" className="hover:text-emerald-400 transition-colors">
                  contact@bagpresto.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:+33123456789" className="hover:text-emerald-400 transition-colors">
                  01 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1" />
                <span>Normandie, France</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                100% Éco-responsable
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BagPresto. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
