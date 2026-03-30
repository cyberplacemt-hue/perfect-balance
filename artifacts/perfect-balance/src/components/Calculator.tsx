import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import horseLeisureImg from "../assets/horse-leisure.jpeg";
import horseSportImg from "../assets/horse-sport.jpeg";

const usageTypes = [
  {
    image: horseLeisureImg,
    alt: "Прогулочная лошадь на природе",
    label: "Прогулочные",
    sub: "Ковка 4 раза в год",
    timesPerYear: 4,
  },
  {
    image: horseSportImg,
    alt: "Спортивная лошадь на тренировке или соревнованиях",
    label: "Спортивные",
    sub: "Ковка 6 раз в год",
    timesPerYear: 6,
  },
  {
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80",
    alt: "Рабочая лошадь на конюшне",
    label: "Рабочие",
    sub: "Ковка 8 раз в год",
    timesPerYear: 8,
  },
  {
    image: "https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=600&q=80",
    alt: "Лошадь в конно-спортивном клубе",
    label: "Смешанные",
    sub: "Ковка 5 раз в год",
    timesPerYear: 5,
  },
];

const quickCounts = [1, 5, 10, 25, 50];

const SHOE_PRICE = 1290;
const NAIL_BOX_PRICE = 890;
const NAILS_PER_SHOEING = 2;

export function Calculator() {
  const [horses, setHorses] = useState(5);
  const [usageIdx, setUsageIdx] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const clamp = (v: number) => Math.max(1, Math.min(500, v));

  const usage = usageTypes[usageIdx];
  const shoeingsPerYear = usage.timesPerYear;
  const shoesTotal = horses * 4 * shoeingsPerYear;
  const nailBoxesTotal = horses * NAILS_PER_SHOEING * shoeingsPerYear;
  const shoeCost = shoesTotal * SHOE_PRICE;
  const nailCost = nailBoxesTotal * NAIL_BOX_PRICE;
  const totalCost = shoeCost + nailCost;

  const fmt = (n: number) =>
    n.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });

  return (
    <section
      id="calculator"
      className="relative py-24 overflow-hidden"
      style={{
        background: "#1a1a1a",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,168,75,0.03) 60px, rgba(200,168,75,0.03) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,168,75,0.03) 60px, rgba(200,168,75,0.03) 61px)",
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            КАЛЬКУЛЯТОР
          </p>
          <h2 className="font-display text-white mb-3" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
            Сколько подков нужно<br />вашей конюшне?
          </h2>
          <p className="text-white/50 text-base">
            Рассчитайте точное количество и стоимость за год
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-[#c8a84b]/30 p-8 md:p-12"
          style={{
            background: "rgba(26,26,26,0.85)",
            backdropFilter: "blur(16px)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >

          {/* STEP 1 */}
          <div className="mb-10">
            <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-widest mb-2">
              Шаг 1
            </p>
            <label className="text-white font-display text-xl mb-6 block">
              Количество лошадей
            </label>

            <div className="flex items-center gap-0 mb-5">
              <button
                onClick={() => setHorses(h => clamp(h - 1))}
                aria-label="Уменьшить количество лошадей"
                className="w-12 h-12 bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] text-2xl font-bold rounded-l-xl transition-colors flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b]"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={500}
                value={horses}
                onChange={e => setHorses(clamp(Number(e.target.value) || 1))}
                aria-label="Количество лошадей"
                className="w-24 h-12 bg-[#111] border-y border-[#c8a84b]/30 text-white text-2xl font-bold text-center focus:outline-none focus:border-[#c8a84b]"
              />
              <button
                onClick={() => setHorses(h => clamp(h + 1))}
                aria-label="Увеличить количество лошадей"
                className="w-12 h-12 bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] text-2xl font-bold rounded-r-xl transition-colors flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b]"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickCounts.map(n => (
                <button
                  key={n}
                  onClick={() => setHorses(n)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b] ${
                    horses === n
                      ? "bg-[#c8a84b] border-[#c8a84b] text-[#1a1a1a]"
                      : "border-white/20 text-white/70 hover:border-[#c8a84b] hover:text-[#c8a84b]"
                  }`}
                >
                  {n === 1 ? "1 лошадь" : `${n} лошадей`}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="mb-10">
            <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-widest mb-2">
              Шаг 2
            </p>
            <label className="text-white font-display text-xl mb-6 block">
              Тип использования
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {usageTypes.map((u, i) => (
                <button
                  key={u.label}
                  onClick={() => setUsageIdx(i)}
                  className={`block w-full overflow-hidden rounded-xl border-2 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b] ${
                    usageIdx === i
                      ? "border-[#c8a84b] shadow-lg shadow-[#c8a84b]/20"
                      : "border-white/10 hover:border-[#c8a84b]/50"
                  }`}
                >
                  {/* aspect-ratio wrapper — padding-top trick, работает стабильно во всех браузерах */}
                  <div className="relative w-full" style={{ paddingTop: "115%" }}>
                    <img
                      src={u.image}
                      alt={u.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: "scale(1)" }}
                    />
                    {/* затемняющий overlay */}
                    <div className={`absolute inset-0 transition-all duration-200 ${
                      usageIdx === i ? "bg-black/40" : "bg-black/60"
                    }`} />
                    {/* галочка выбранного состояния */}
                    {usageIdx === i && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#c8a84b] flex items-center justify-center z-10">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {/* текст внизу карточки */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 px-3 py-2.5"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
                    >
                      <p className={`text-sm font-bold leading-tight mb-0.5 ${usageIdx === i ? "text-[#c8a84b]" : "text-white"}`}>
                        {u.label}
                      </p>
                      <p className="text-white/75 text-xs leading-tight">{u.sub}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RESULT */}
          <motion.div
            key={`${horses}-${usageIdx}`}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-widest mb-6">
              Ваш расчёт на год
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#111] rounded-xl p-5 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Ковок в год</p>
                <p className="font-display text-[#c8a84b] text-3xl">{horses * shoeingsPerYear}</p>
                <p className="text-white/30 text-xs mt-1">{horses} лош. × {shoeingsPerYear} раз</p>
              </div>
              <div className="bg-[#111] rounded-xl p-5 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Подков</p>
                <p className="font-display text-[#c8a84b] text-3xl">{shoesTotal}</p>
                <p className="text-white/30 text-xs mt-1">4 на лошадь × {shoeingsPerYear} ковок</p>
              </div>
              <div className="bg-[#111] rounded-xl p-5 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Коробок гвоздей</p>
                <p className="font-display text-[#c8a84b] text-3xl">{nailBoxesTotal}</p>
                <p className="text-white/30 text-xs mt-1">~250 шт. на ковку</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#c8a84b]/15 to-[#c8a84b]/5 rounded-xl p-6 border border-[#c8a84b]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Ориентировочная стоимость в год</p>
                <p className="font-display text-white text-4xl">{fmt(totalCost)}</p>
                <p className="text-white/40 text-xs mt-1">
                  Подковы {fmt(shoeCost)} + Гвозди {fmt(nailCost)}
                </p>
              </div>
              <Link
                href="/catalog"
                className="flex-shrink-0 inline-block bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-[#c8a84b]/30 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b]"
              >
                Оформить заказ
              </Link>
            </div>

            <p className="text-white/25 text-xs mt-4 text-center">
              * Расчёт ориентировочный. Итоговая цена зависит от выбранных размеров и объёма заказа.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
