import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Truck, PackageSearch, Star } from "lucide-react";
import { useSubmitContact, useGetProducts } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/ProductCard";

const contactSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
  email: z.string().email("Неверный email").optional().or(z.literal("")),
  clientType: z.string().optional(),
  message: z.string().min(10, "Слишком короткое сообщение"),
});

export default function Home() {
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  
  // Simulated fallback data since backend might be empty
  const { data: products } = useGetProducts();
  const featuredProducts = products?.slice(0, 4) || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    contactMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "Сообщение отправлено", description: "Мы свяжемся с вами в ближайшее время." });
          reset();
        },
        onError: () => {
          toast({ variant: "destructive", title: "Ошибка", description: "Не удалось отправить сообщение." });
        }
      }
    );
  };

  return (
    <AppLayout>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden">
        {/* landing page hero dark forge anvil */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block border border-primary/30 rounded-full px-4 py-1 mb-6 glass">
              <span className="text-primary text-xs uppercase tracking-widest font-semibold">
                Премиальное качество
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-6">
              Подковы для <br/>
              <span className="text-gradient-gold">победителей</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Профессиональное оборудование для ковки. Инновационные сплавы, идеальный баланс и надежность, проверенная лучшими КСК России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/catalog" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Перейти в каталог
              </Link>
              <a 
                href="#contact" 
                className="border border-white/20 hover:border-primary text-white hover:text-primary px-8 py-4 rounded-sm font-semibold uppercase tracking-widest transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                Узнать цены
              </a>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-display text-primary">500+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Клиентов</p>
              </div>
              <div>
                <p className="text-3xl font-display text-primary">1-3</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Дня доставка</p>
              </div>
              <div>
                <p className="text-3xl font-display text-primary">100%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Качество</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-primary/10 border-y border-primary/20 py-4 overflow-hidden relative flex">
        <div className="flex whitespace-nowrap animate-marquee items-center text-primary uppercase font-display tracking-[0.2em] text-sm">
          <span className="mx-8">• Perfect Balance</span>
          <span className="mx-8">• Спортивные подковы</span>
          <span className="mx-8">• Доставка по России</span>
          <span className="mx-8">• Работаем с ковалями и КСК</span>
          <span className="mx-8">• Качественная сталь</span>
          <span className="mx-8">• Perfect Balance</span>
          <span className="mx-8">• Спортивные подковы</span>
          <span className="mx-8">• Доставка по России</span>
          <span className="mx-8">• Работаем с ковалями и КСК</span>
          <span className="mx-8">• Качественная сталь</span>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-background relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/images/pattern.png')] bg-cover opacity-5 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-display text-4xl text-white mb-4">Популярные модели</h2>
                <p className="text-muted-foreground">Выбор профессионалов для тренировок и соревнований.</p>
              </div>
              <Link href="/catalog" className="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold">
                Смотреть все <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY SPLIT */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
        <Link href="/catalog?category=Подковы" className="relative group overflow-hidden block">
          <img 
            src={`${import.meta.env.BASE_URL}images/horseshoes.png`} 
            alt="Подковы" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h2 className="font-display text-5xl text-white mb-6">Подковы</h2>
            <span className="inline-block border border-primary text-primary px-6 py-3 uppercase tracking-widest text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              Выбрать
            </span>
          </div>
        </Link>
        <Link href="/catalog?category=Гвозди" className="relative group overflow-hidden block">
          <img 
            src={`${import.meta.env.BASE_URL}images/nails.png`} 
            alt="Гвозди" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h2 className="font-display text-5xl text-white mb-6">Гвозди</h2>
            <span className="inline-block border border-primary text-primary px-6 py-3 uppercase tracking-widest text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              Выбрать
            </span>
          </div>
        </Link>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-[#0a0a0a]" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl text-white mb-4">Почему Perfect Balance?</h2>
            <p className="text-muted-foreground">Мы создаем продукцию, которая отвечает самым высоким стандартам конного спорта.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Безупречное качество</h3>
              <p className="text-muted-foreground text-sm">Сплавы повышенной прочности, устойчивые к истиранию даже при интенсивных нагрузках.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <PackageSearch className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Широкий ассортимент</h3>
              <p className="text-muted-foreground text-sm">Модели для любых дисциплин, особенностей копыта и ортопедических задач.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Надежная логистика</h3>
              <p className="text-muted-foreground text-sm">Быстрая отгрузка со склада в Москве. Доставка в любой регион транспортными компаниями.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass rounded-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="font-display text-4xl text-white mb-4">Свяжитесь с нами</h2>
              <p className="text-muted-foreground mb-8">
                Оставьте заявку на получение оптового прайса или консультацию по подбору продукции. Мы работаем с частными ковалями, магазинами и КСК.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="font-bold font-display">Т</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <a href="tel:+79991234567" className="text-lg hover:text-primary transition-colors">+7 (999) 123-45-67</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="font-bold font-display">E</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@perfect-balance.ru" className="text-lg hover:text-primary transition-colors">info@perfect-balance.ru</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Имя *</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Иван Иванов"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Телефон *</label>
                    <input 
                      {...register("phone")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Тип клиента</label>
                  <select 
                    {...register("clientType")}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Коваль">Частный коваль</option>
                    <option value="КСК">Конно-спортивный клуб</option>
                    <option value="Магазин">Конный магазин</option>
                    <option value="Владелец">Владелец лошади</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Сообщение *</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Какие товары вас интересуют?"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {contactMutation.isPending ? "Отправка..." : "Отправить заявку"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </AppLayout>
  );
}
