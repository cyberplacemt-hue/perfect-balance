import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@workspace/api-client-react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const checkoutSchema = z.object({
  name: z.string().min(2, "Введите ФИО"),
  phone: z.string().min(10, "Введите телефон"),
  email: z.string().email("Неверный email"),
  city: z.string().min(2, "Введите город"),
  address: z.string().min(5, "Введите адрес"),
  transportCompany: z.string().min(2, "Укажите ТК (например, СДЭК, Деловые Линии)"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, cartTotal, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();
  
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur"
  });

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      setLocation("/cart");
    }
  }, [items.length, isSuccess, setLocation]);

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "phone", "email"]);
    } else if (step === 2) {
      isValid = await trigger(["city", "address", "transportCompany"]);
    }
    
    if (isValid) setStep(step + 1);
  };

  const onSubmit = (data: CheckoutForm) => {
    createOrderMutation.mutate(
      {
        data: {
          ...data,
          items: items.map(i => ({ ...i })),
          total: cartTotal
        }
      },
      {
        onSuccess: (res) => {
          setOrderId(res.orderId);
          setIsSuccess(true);
          clearCart();
        }
      }
    );
  };

  if (isSuccess) {
    return (
      <AppLayout>
        <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 text-center min-h-[70vh] flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Заказ успешно оформлен!</h1>
          <p className="text-xl text-muted-foreground mb-2">Номер вашего заказа: <span className="text-primary font-bold">{orderId}</span></p>
          <p className="text-white/70 mb-10 max-w-lg">
            Мы выслали детали заказа на ваш email. Наш менеджер свяжется с вами в ближайшее время для подтверждения.
          </p>
          <Link 
            href="/catalog" 
            className="border border-primary text-primary px-8 py-4 rounded-sm font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Продолжить покупки
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/10 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 bg-background ${
                step >= num ? 'border-primary text-primary' : 'border-white/20 text-white/40'
              } ${step === num ? 'shadow-[0_0_15px_rgba(200,168,75,0.4)]' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Step 1: Контакты */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="font-display text-3xl text-white mb-8 border-b border-white/10 pb-4">Контактные данные</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">ФИО *</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Телефон *</label>
                    <input 
                      {...register("phone")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Email *</label>
                    <input 
                      {...register("email")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    Далее <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Доставка */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="font-display text-3xl text-white mb-8 border-b border-white/10 pb-4">Информация о доставке</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Город *</label>
                    <input 
                      {...register("city")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Транспортная компания *</label>
                    <input 
                      {...register("transportCompany")}
                      placeholder="Например, СДЭК"
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.transportCompany && <p className="text-destructive text-xs mt-1">{errors.transportCompany.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Адрес терминала или до двери *</label>
                    <input 
                      {...register("address")}
                      className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                    {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
                  </div>
                </div>
                <div className="mt-10 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-white/60 hover:text-white px-4 py-3 uppercase tracking-widest text-sm font-medium"
                  >
                    Назад
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    Далее <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Подтверждение */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="font-display text-3xl text-white mb-8 border-b border-white/10 pb-4">Подтверждение заказа</h2>
                
                <div className="bg-black/30 rounded-xl p-6 border border-white/5 mb-8">
                  <h3 className="text-primary font-semibold mb-4 uppercase tracking-widest text-sm">Ваши данные</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block text-xs">Получатель</span>
                      <span className="text-white">{getValues("name")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Контакты</span>
                      <span className="text-white">{getValues("phone")} / {getValues("email")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Доставка</span>
                      <span className="text-white">{getValues("city")}, ТК: {getValues("transportCompany")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Адрес</span>
                      <span className="text-white">{getValues("address")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-white/5 mb-8">
                  <h3 className="text-primary font-semibold mb-4 uppercase tracking-widest text-sm">Состав заказа</h3>
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-white/80">{item.name} <span className="text-muted-foreground">x{item.qty}</span></span>
                        <span className="text-white font-medium">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-bold text-lg">
                      <span className="text-white">Итого:</span>
                      <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="text-white/60 hover:text-white px-4 py-3 uppercase tracking-widest text-sm font-medium"
                  >
                    Назад
                  </button>
                  <button 
                    type="submit" 
                    disabled={createOrderMutation.isPending}
                    className="bg-primary text-primary-foreground px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
                  >
                    {createOrderMutation.isPending ? "Обработка..." : "Подтвердить заказ"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

      </div>
    </AppLayout>
  );
}
