import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQty, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center min-h-[60vh] flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground mb-6">
            <Trash2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display text-white mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-8">Похоже, вы еще ничего не добавили в корзину.</p>
          <Link 
            href="/catalog" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-sm font-semibold uppercase tracking-widest transition-all duration-300"
          >
            Перейти в каталог
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-white mb-10">Оформление заказа</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-xl overflow-hidden">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <div className="col-span-6">Товар</div>
                <div className="col-span-3 text-center">Количество</div>
                <div className="col-span-2 text-right">Сумма</div>
                <div className="col-span-1"></div>
              </div>
              
              {/* Items */}
              <div className="divide-y divide-white/5">
                {items.map((item) => (
                  <div key={item.productId} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-6 flex items-center gap-4">
                      <div>
                        <Link href={`/product/${item.productId}`} className="font-display text-lg text-white hover:text-primary transition-colors block mb-1">
                          {item.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {item.price.toLocaleString('ru-RU')} ₽ / {item.unit}
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3 flex justify-center">
                      <div className="flex items-center border border-white/20 rounded-sm overflow-hidden h-10 bg-black/30">
                        <button 
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="w-10 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="w-12 h-full flex items-center justify-center text-white font-medium text-sm border-x border-white/20">
                          {item.qty}
                        </div>
                        <button 
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="w-10 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2 text-right font-bold text-white text-lg">
                      {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                    </div>

                    <div className="sm:col-span-1 flex justify-end">
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-8 sticky top-28">
              <h3 className="font-display text-xl text-white mb-6">Сумма заказа</h3>
              
              <div className="space-y-4 text-sm mb-6 border-b border-white/10 pb-6">
                <div className="flex justify-between text-white/80">
                  <span>Товары ({items.reduce((a, b) => a + b.qty, 0)})</span>
                  <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Доставка</span>
                  <span className="text-muted-foreground text-xs uppercase">Рассчитывается отдельно</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-white font-medium">Итого</span>
                <span className="font-display text-3xl text-primary font-bold">
                  {cartTotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <Link 
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Оформить заказ <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
