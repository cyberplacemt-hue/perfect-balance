import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const allReviews = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Коваль",
    city: "Москва",
    category: "Ковали",
    stars: 5,
    date: "15 марта 2025",
    product: "БУЛАТ Pro №2",
    text: "Работаю ковалём уже 18 лет, перепробовал много марок. БУЛАТ — лучшее соотношение цены и качества на российском рынке. Геометрия точная, сталь не крошится, гвозди входят ровно. Заказываю уже третий год подряд, ни разу не подвели ни по качеству, ни по срокам.",
    likes: 47,
    initials: "АП",
    color: "#c8a84b",
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Директор КСК «Алмазово»",
    city: "Московская обл.",
    category: "КСК",
    stars: 5,
    date: "2 февраля 2025",
    product: "БУЛАТ Pro №3",
    text: "Снабжаем наш клуб подковами БУЛАТ уже 7 лет. 40 лошадей на постое, плюс спортивные. Всегда в наличии нужные размеры, отгрузка быстрая, менеджер на связи. Один раз была проблема с партией — заменили без вопросов. Вот это сервис.",
    likes: 63,
    initials: "ЕС",
    color: "#1a1a1a",
  },
  {
    id: 3,
    name: "Дмитрий Коваленко",
    role: "Коваль, частная практика",
    city: "Краснодар",
    category: "Ковали",
    stars: 5,
    date: "28 января 2025",
    product: "БУЛАТ Nails E4",
    text: "Гвозди E4 — просто огонь. Раньше брал Mustad, но после того как цены взлетели — перешёл на БУЛАТ Nails. Честно говоря, по качеству не хуже. Вхождение чистое, загиб ровный. Коробки 250 штук хватает примерно на месяц работы.",
    likes: 38,
    initials: "ДК",
    color: "#c8a84b",
  },
  {
    id: 4,
    name: "Ирина Власова",
    role: "Владелец 3 лошадей",
    city: "Санкт-Петербург",
    category: "Владельцы",
    stars: 5,
    date: "10 января 2025",
    product: "БУЛАТ Pro №1",
    text: "Покупаю подковы сама и передаю своему ковалю. Цены адекватные, качество стабильное. Заказывала уже 4 раза — доставка всегда приходит вовремя, упаковка надёжная. Очень довольна, рекомендую всем владельцам кто хочет сэкономить без потери качества.",
    likes: 29,
    initials: "ИВ",
    color: "#2a2a2a",
  },
  {
    id: 5,
    name: "Сергей Воронов",
    role: "Тренер по конкуру",
    city: "Казань",
    category: "КСК",
    stars: 5,
    date: "22 декабря 2024",
    product: "БУЛАТ Pro №3",
    text: "Мои спортивные лошади выступают в подковах БУЛАТ уже 3 сезона. За это время — ни одного слетевшего на соревнованиях. Геометрия идеальная, сталь держит нагрузку. Буду рекомендовать коллегам по всему региону.",
    likes: 55,
    initials: "СВ",
    color: "#c8a84b",
  },
  {
    id: 6,
    name: "Наталья Громова",
    role: "КСК «Звёздный»",
    city: "Екатеринбург",
    category: "КСК",
    stars: 4,
    date: "15 декабря 2024",
    product: "БУЛАТ Pro №2",
    text: "Хороший продукт, работаем второй год. Немного долго шла первая поставка — 5 дней вместо трёх, но менеджер предупредил заранее. Качество подков отличное, лошади ходят хорошо. В целом рекомендую, особенно для регионов где с ассортиментом туго.",
    likes: 21,
    initials: "НГ",
    color: "#3a2a0a",
  },
  {
    id: 7,
    name: "Андрей Беляев",
    role: "Коваль 25 лет стажа",
    city: "Нижний Новгород",
    category: "Ковали",
    stars: 5,
    date: "5 декабря 2024",
    product: "БУЛАТ Pro №4",
    text: "№4 беру для тяжёлых пород — тракены, владимирские тяжеловозы. Подкова держит форму даже при серьёзных нагрузках. Сталь не мягкая и не хрупкая — в самый раз. БУЛАТ знаю уже лет десять, марка проверенная.",
    likes: 44,
    initials: "АБ",
    color: "#c8a84b",
  },
  {
    id: 8,
    name: "Юлия Морозова",
    role: "Частная конюшня «Рассвет»",
    city: "Ростов-на-Дону",
    category: "Частные конюшни",
    stars: 5,
    date: "28 ноября 2024",
    product: "БУЛАТ Pro №2",
    text: "У нас 12 лошадей, заказываем раз в квартал. Работаем с БУЛАТ уже 4 года. Цены стабильные, не скачут каждый месяц как у некоторых. Менеджер Алексей всегда на связи, помогает с подбором. Отдельное спасибо за оперативность!",
    likes: 33,
    initials: "ЮМ",
    color: "#1a2a1a",
  },
  {
    id: 9,
    name: "Максим Зайцев",
    role: "Коваль, выезд по Подмосковью",
    city: "Подольск",
    category: "Ковали",
    stars: 5,
    date: "20 ноября 2024",
    product: "БУЛАТ Nails E3",
    text: "Гвозди E3 идеально подходят для молодых лошадей и тех у кого тонкая стенка копыта. Раньше приходилось искать специально — теперь беру у БУЛАТ. Качество стабильное от партии к партии, что очень важно в нашей работе.",
    likes: 19,
    initials: "МЗ",
    color: "#c8a84b",
  },
  {
    id: 10,
    name: "Татьяна Орлова",
    role: "КСК «Олимп»",
    city: "Новосибирск",
    category: "КСК",
    stars: 5,
    date: "10 ноября 2024",
    product: "БУЛАТ Pro №3",
    text: "Заказываем для 25 спортивных лошадей. БУЛАТ — наш основной поставщик уже 5 лет. Что нравится: всегда есть нужные размеры, документы оформляют быстро, доставка в Новосибирск занимает 3-4 дня. Качество стабильное, претензий нет.",
    likes: 41,
    initials: "ТО",
    color: "#1a1a2a",
  },
  {
    id: 11,
    name: "Владимир Чернов",
    role: "Профессиональный коваль",
    city: "Воронеж",
    category: "Ковали",
    stars: 5,
    date: "1 ноября 2024",
    product: "БУЛАТ Pro №2",
    text: "Обслуживаю 8 конюшен в регионе, расход подков большой. С БУЛАТ работаю потому что: цена честная, качество предсказуемое, и главное — никогда не подводили со сроками. Для ковалей это критически важно.",
    likes: 52,
    initials: "ВЧ",
    color: "#c8a84b",
  },
  {
    id: 12,
    name: "Ольга Степанова",
    role: "Владелец лошади",
    city: "Самара",
    category: "Владельцы",
    stars: 5,
    date: "25 октября 2024",
    product: "БУЛАТ Pro №1",
    text: "Моя кобыла ходит в подковах БУЛАТ №1 уже два года. Коваль сам посоветовал этот бренд. Очень довольна — подковы держатся хорошо, лошадь не хромает, копыта в порядке. Буду заказывать дальше.",
    likes: 17,
    initials: "ОС",
    color: "#2a1a1a",
  },
];

const categories = ["Все", "Ковали", "КСК", "Частные конюшни", "Владельцы"];

const bars = [
  { label: "Качество", pct: 99 },
  { label: "Сервис", pct: 98 },
  { label: "Доставка", pct: 96 },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#c8a84b] text-base">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function ReviewCard({ review, delay }: { review: typeof allReviews[0]; delay: number }) {
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: review.color }}
        >
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">{review.name}</p>
          <p className="text-gray-500 text-xs leading-tight">{review.role} · {review.city}</p>
          <p className="text-green-600 text-[10px] font-medium mt-0.5">✓ Проверенный покупатель</p>
        </div>
      </div>

      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <Stars count={review.stars} />
        <span className="text-gray-400 text-xs">{review.date}</span>
      </div>

      {/* Product tag */}
      <div>
        <span className="inline-block border border-[#c8a84b] text-[#a8882b] text-[11px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wide">
          {review.product}
        </span>
      </div>

      {/* Text */}
      <p className="text-gray-700 text-sm leading-[1.75] flex-1">{review.text}</p>

      {/* Like */}
      <button
        onClick={() => {
          if (!liked) { setLikes(l => l + 1); setLiked(true); }
        }}
        className={`flex items-center gap-1.5 text-xs mt-auto self-start transition-colors ${liked ? "text-[#c8a84b]" : "text-gray-400 hover:text-[#c8a84b]"}`}
      >
        <span className="text-base">👍</span>
        <span>Полезный отзыв? {likes}</span>
      </button>
    </motion.div>
  );
}

export function Reviews() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [visibleCount, setVisibleCount] = useState(6);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filtered = activeCategory === "Все"
    ? allReviews
    : allReviews.filter(r => r.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const total = filtered.length;
  const allLoaded = visibleCount >= total;

  const handleFilterChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  return (
    <section id="reviews" className="bg-[#f8f5ef] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            ОТЗЫВЫ КЛИЕНТОВ
          </p>
          <h2 className="font-display text-[#1a1a1a] mb-3" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
            Нам доверяют 500+ конюшен
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto mb-10">
            Реальные отзывы ковалей, КСК и владельцев лошадей со всей России
          </p>

          {/* Rating summary */}
          <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl px-10 py-7 shadow-md">
            <div className="text-center">
              <p className="font-display text-[#c8a84b] leading-none mb-1" style={{ fontSize: "clamp(48px, 7vw, 72px)" }}>4.9</p>
              <p className="text-[#c8a84b] text-2xl mb-1">★★★★★</p>
              <p className="text-gray-500 text-xs">на основе 500+ отзывов</p>
            </div>
            <div className="w-px h-20 bg-gray-200 hidden md:block" />
            <div className="space-y-3 text-sm min-w-[180px]">
              {bars.map(b => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-gray-600 w-20 text-right text-xs">{b.label}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c8a84b] rounded-full"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                  <span className="text-[#c8a84b] font-semibold text-xs w-8">{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-[#c8a84b] border-[#c8a84b] text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#c8a84b] hover:text-[#c8a84b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((review, i) => (
            <ReviewCard key={`${review.id}-${activeCategory}`} review={review} delay={i * 0.06} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mb-16">
          {!allLoaded ? (
            <button
              onClick={() => setVisibleCount(v => v + 6)}
              className="px-8 py-3 border-2 border-[#c8a84b] text-[#c8a84b] font-semibold rounded-full hover:bg-[#c8a84b] hover:text-white transition-all duration-300"
            >
              Загрузить ещё отзывы (показано {visible.length} из {total})
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-3 border-2 border-gray-300 text-gray-400 font-semibold rounded-full cursor-not-allowed"
            >
              Все отзывы загружены ✓
            </button>
          )}
        </div>

        {/* Write review banner */}
        <div className="bg-[#1a1a1a] rounded-2xl px-8 py-10 text-center">
          <h3 className="font-display text-white text-2xl mb-2">Уже работаете с БУЛАТ?</h3>
          <p className="text-white/60 text-sm mb-6">
            Оставьте отзыв и получите скидку 5% на следующий заказ
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contact = document.getElementById("contact");
              if (contact) {
                contact.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/#contact";
              }
            }}
            className="inline-block bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] px-10 py-3 font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
          >
            Написать отзыв
          </a>
        </div>
      </div>
    </section>
  );
}
