import { useState, useEffect } from 'react';
import { Heart, Calendar, Star, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-08-30T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      let diff = now.getTime() - targetDate.getTime();
      if (diff < 0) diff = 0;

      let years = now.getFullYear() - targetDate.getFullYear();
      let months = now.getMonth() - targetDate.getMonth();
      let days = now.getDate() - targetDate.getDate();

      if (days < 0) {
        months -= 1;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours() - targetDate.getHours() < 0 ? 24 + (now.getHours() - targetDate.getHours()) : now.getHours() - targetDate.getHours();
      const minutes = now.getMinutes() - targetDate.getMinutes() < 0 ? 60 + (now.getMinutes() - targetDate.getMinutes()) : now.getMinutes() - targetDate.getMinutes();
      const seconds = now.getSeconds() - targetDate.getSeconds() < 0 ? 60 + (now.getSeconds() - targetDate.getSeconds()) : now.getSeconds() - targetDate.getSeconds();

      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#4A1D2C] selection:bg-pink-200 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 bg-white/50 backdrop-blur-md shadow-sm">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm font-semibold tracking-wide uppercase text-rose-800">Mauricio & Aranza</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-rose-950">
            Nuestro Tiempo Juntos
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 w-full max-w-4xl">
            {[
              { label: 'Años', value: time.years },
              { label: 'Meses', value: time.months },
              { label: 'Días', value: time.days },
              { label: 'Horas', value: time.hours },
              { label: 'Minutos', value: time.minutes },
              { label: 'Segundos', value: time.seconds },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/70 border border-rose-100 p-6 rounded-3xl backdrop-blur-lg shadow-sm"
              >
                <div className="text-2xl md:text-3xl font-bold text-rose-900 mb-1">{item.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-rose-500/70 font-semibold">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Love Letter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 w-full max-w-2xl px-6"
        >
          <div className="bg-white/80 p-8 md:p-12 rounded-[3rem] border border-rose-100 shadow-xl backdrop-blur-xl relative">
            <Heart className="w-8 h-8 text-rose-300 absolute top-8 left-8" />
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-serif font-bold text-rose-900 italic">Para Aranza, mi Barbie</h2>
              <div className="text-rose-800/80 leading-relaxed space-y-4 font-light text-lg">
                <p> Mi amor, cada momento a tu lado ha sido un regalo que guardo con todo mi corazón.</p>
                <p>De verdad quiero compartir mi futuro contigo, caminar de la mano en cada paso de nuestras vidas. No puedo esperar para ver lo que Dios tiene preparado para nosotros; sé que será muy bonito porque estaremos juntos.</p>
                <p className="font-semibold text-rose-950 pt-4">Te amo demsaiado, Mau tu inge.</p>
              </div>
            </div>
            <Heart className="w-8 h-8 text-rose-300 absolute bottom-8 right-8" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
