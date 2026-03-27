import { Link } from "wouter";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="БУЛАТ Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-display text-xl tracking-wide text-white group-hover:text-primary transition-colors">
                БУЛАТ
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Профессиональные подковы и гвозди для лошадей. Выбор лучших ковалей и конно-спортивных клубов России.
            </p>
            <a
              href="tel:89150016878"
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              8 (915) 001-68-78
            </a>
          </div>

          <div>
            <h4 className="font-display text-lg text-white mb-6">Каталог</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Все товары
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Подковы" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Подковы БУЛАТ Pro
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Гвозди" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Гвозди БУЛАТ Nails
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-white mb-6">Информация</h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  О компании
                </a>
              </li>
              <li>
                <a href="#history" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  История бренда
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-white mb-6">Связь с нами</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="tel:89150016878" className="flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold text-base">
                  <Phone className="w-4 h-4" />
                  8 (915) 001-68-78
                </a>
              </li>
              <li className="leading-relaxed">
                <p>г. Мытищи, Московская обл.</p>
              </li>
              <li>
                <p>Пн–Пт: 09:00 – 18:00</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} БУЛАТ. Все права защищены. ИП Фролов Алексей Леонтьевич · ИНН 502911262470 · ОГРНИП 319508100094886
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            Наверх ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
