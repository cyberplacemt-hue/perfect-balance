import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

const chapters = [
  {
    id: 1,
    year: "1995",
    label: "ГЛАВА I • 1995",
    title: "Рождённые в кузнице",
    quote: "Один кузнец. Одна мечта. Одна наковальня.",
    body: "Всё началось в небольшой кузнице под Рязанью в 1995 году. Михаил Булатов — потомственный кузнец в третьем поколении — вернулся из армии и встал к наковальне своего деда. Вокруг царили девяностые: хаос, безденежье, распад колхозных конюшен. Но лошади никуда не делись. И им по-прежнему были нужны подковы. Михаил заметил простую вещь: качественных подков в России почти не было. Импорт стоил как крыло самолёта, а отечественное гнулось после первой же скачки. Он решил: буду делать сам. Так родился БУЛАТ.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=85",
    imageLeft: true,
  },
  {
    id: 2,
    year: "2000",
    label: "ГЛАВА II • 1998–2003",
    title: "Первые победители",
    quote: "Нас не рекламировали. Нас передавали из уст в уста.",
    body: "Первыми клиентами стали местные конюшни Рязанской и Тульской областей. Ковали брали подковы БУЛАТ и возвращались снова — потому что они держались. Потому что геометрия была точной. Потому что сталь не подводила. К 2000 году о БУЛАТ знали уже в десяти регионах. Никакой рекламы — только сарафанное радио среди ковалей. В 2003 году БУЛАТ впервые поставил подковы на крупный КСК Подмосковья. Лошади выступали в них на региональных соревнованиях. И побеждали.",
    image: "https://images.unsplash.com/photo-1449927482389-c0e6670f4a1e?w=1400&q=85",
    imageLeft: false,
  },
  {
    id: 3,
    year: "2008",
    label: "ГЛАВА III • 2005–2012",
    title: "Федеральный масштаб",
    quote: "Из кузницы — на федеральный уровень.",
    body: "С 2005 года БУЛАТ начал системные поставки по всей России. Открылся первый склад в Москве. Появилась полная линейка размеров — от лёгких прогулочных до мощных спортивных. В 2008 году к подковам добавились ковочные гвозди БУЛАТ Nails — собственная разработка, которая быстро стала любимым инструментом профессиональных ковалей. К 2010 году БУЛАТ работал с более чем 150 конно-спортивными клубами по всей стране.",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=1400&q=85",
    imageLeft: true,
  },
  {
    id: 4,
    year: "2014",
    label: "ГЛАВА IV • 2014–2016",
    title: "Кризис закаляет",
    quote: "Как булатная сталь.",
    body: "Когда грянул кризис 2014 года и курс рубля рухнул — импортные подковы взлетели в цене вдвое. Многие конюшни оказались перед выбором: платить втридорога или искать альтернативу. БУЛАТ стал этой альтернативой. Не потому что был дешевле — а потому что был свой, надёжный и всегда в наличии. Именно в эти годы клиентская база БУЛАТ выросла втрое. Кризис стал точкой роста.",
    image: "https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=1400&q=85",
    imageLeft: false,
  },
  {
    id: 5,
    year: "2020",
    label: "ГЛАВА V • 2018–2022",
    title: "Цифровая эпоха",
    quote: "Кузница встречает интернет.",
    body: "В 2018 году БУЛАТ запустил интернет-магазин и начал принимать заказы онлайн со всей России. Доставка транспортными компаниями, электронный документооборот, личный менеджер для каждого клуба. В 2020 году, когда пандемия ударила по многим бизнесам, конные клубы продолжали работать. И БУЛАТ продолжал поставлять. Бесперебойно.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=85",
    imageLeft: true,
  },
];

const stats = [
  { value: "30", label: "лет на рынке" },
  { value: "500+", label: "клиентов" },
  { value: "50+", label: "регионов" },
  { value: "1995", label: "год основания" },
];

function Chapter({ chapter }: { chapter: typeof chapters[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row min-h-[90vh] ${
        chapter.imageLeft ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Image side */}
      <div className="relative w-full md:w-[55%] h-[50vh] md:h-auto overflow-hidden">
        <motion.img
          src={chapter.image}
          alt={chapter.title}
          loading="lazy"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.3 }}
        >
          <span
            className="text-white font-display font-bold leading-none"
            style={{ fontSize: "clamp(80px, 15vw, 200px)", opacity: 0.12 }}
          >
            {chapter.year}
          </span>
        </motion.div>
      </div>

      {/* Text side */}
      <div
        className={`relative w-full md:w-[45%] bg-[#1a1a1a] flex items-center ${
          chapter.imageLeft
            ? "border-l-0 md:border-l-[3px] border-l-[#c8a84b]"
            : "border-r-0 md:border-r-[3px] border-r-[#c8a84b]"
        }`}
      >
        <motion.div
          className="px-8 md:px-14 py-14"
          initial={{ opacity: 0, x: chapter.imageLeft ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: chapter.imageLeft ? 60 : -60 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-[0.25em] mb-5">
            {chapter.label}
          </p>
          <h3 className="font-display text-white mb-5 leading-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
            {chapter.title}
          </h3>
          <div className="w-10 h-[2px] bg-[#c8a84b] mb-5" />
          <p className="text-[#c8a84b] italic mb-6 leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>
            «{chapter.quote}»
          </p>
          <p className="text-white/75 leading-[1.85] text-sm md:text-base">
            {chapter.body}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-display text-[#c8a84b] mb-1" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
        {value}
      </p>
      <p className="text-white/60 uppercase tracking-widest text-xs">{label}</p>
    </motion.div>
  );
}

export function BrandStory() {
  const finaleRef = useRef(null);
  const isFinaleInView = useInView(finaleRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="history" className="relative">
      {/* Section Header */}
      <div className="bg-[#0d0d0d] py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto mb-8 w-20 h-[2px] bg-[#c8a84b]" />
          <h2 className="font-display text-white mb-4" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            30 ЛЕТ В СЕДЛЕ
          </h2>
          <p className="text-[#c8a84b] uppercase tracking-[0.2em] text-sm mb-4">
            История бренда БУЛАТ • С 1995 года
          </p>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Из рязанской кузницы — к поставкам по всей России
          </p>
        </motion.div>
      </div>

      {/* Chapters */}
      {chapters.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}

      {/* Finale — full width dark cinematic block */}
      <div
        ref={finaleRef}
        className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1553284965-5dd8352ff94d?w=1800&q=85"
          alt="БУЛАТ today"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isFinaleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[#c8a84b] uppercase tracking-[0.25em] text-xs font-bold mb-8">
            СЕГОДНЯ • 2025
          </p>
          <h2 className="font-display text-white leading-tight mb-3" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            30 лет. 500+ клиентов.
          </h2>
          <h2 className="font-display text-[#c8a84b] leading-tight mb-10" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Тысячи победителей.
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto mb-12">
            Сегодня БУЛАТ — это 30 лет на рынке профессиональной ковки, 500+ конюшен и КСК по всей России, поставки в 50+ регионов от Калининграда до Владивостока. Мы не изменили главному принципу Михаила Булатова — качество прежде всего. Каждая подкова проходит контроль. Каждый клиент получает личного менеджера. Каждая лошадь заслуживает лучшего.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 border-t border-white/10 pt-12">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} delay={i * 0.15} />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-[#c8a84b] pl-6 text-left mb-10 mx-auto max-w-xl">
            <p className="text-[#c8a84b] italic text-lg leading-relaxed mb-3">
              «Булатная сталь не ломается. Она закаляется. Именно так мы строили этот бренд — 30 лет подряд.»
            </p>
            <cite className="text-white/50 text-sm not-italic">— Михаил Булатов, основатель БУЛАТ</cite>
          </blockquote>

          <Link
            href="/catalog"
            className="inline-block bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] px-12 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-[#c8a84b]/30 hover:-translate-y-0.5"
          >
            Перейти в каталог
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
