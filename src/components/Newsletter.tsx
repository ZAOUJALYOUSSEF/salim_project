import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiA0NGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/30">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Restez informé des <span className="text-emerald-200">nouveautés</span>
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Recevez nos actualités, conseils marketing local, et offres exclusives directement dans votre boîte mail.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 mt-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Merci de votre inscription !</h3>
              <p className="text-emerald-100">Vous recevrez bientôt nos actualités.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  <span>S'inscrire</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-emerald-100 text-sm mt-4">
                Pas de spam, désinscription possible à tout moment.
              </p>
            </motion.form>
          )}

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            {[
              { number: '1x', label: 'par mois' },
              { number: '100%', label: 'gratuit' },
              { number: '0', label: 'spam' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-emerald-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
