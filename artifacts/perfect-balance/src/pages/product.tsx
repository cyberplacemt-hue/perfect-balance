import { useState } from "react";
import { useRoute } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useGetProduct } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = Number(params?.id);
  
  const { data: product, isLoading, isError } = useGetProduct(productId);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 w-full flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  if (isError || !product) {
    return (
      <AppLayout>
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center min-h-[60vh] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-display text-white mb-4">Товар не найден</h1>
          <Link href="/catalog" className="text-primary hover:underline">Вернуться в каталог</Link>
        </div>
      </AppLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      qty,
      unit: "уп.",
      price: product.price_box
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AppLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/catalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> В каталог
        </Link>

        <div className="glass rounded-2xl p-6 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center p-8">
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 bg-primary text-primary-foreground text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-sm">
                  {product.badge}
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain filter drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/product-placeholder.png`;
                }}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="text-primary text-sm uppercase tracking-widest font-semibold mb-2">
                {product.category}
              </div>
              <h1 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-2xl font-bold text-white mb-2">
                {product.price_box.toLocaleString('ru-RU')} ₽ <span className="text-lg text-muted-foreground font-normal">/ уп.</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                В упаковке: {product.package_qty} шт.
                {product.price_pair && ` (Цена за пару: ${product.price_pair.toLocaleString('ru-RU')} ₽)`}
              </p>

              <p className="text-white/80 leading-relaxed mb-8">
                {product.description}
              </p>

              {product.specs && (
                <div className="mb-10">
                  <h3 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">Характеристики</h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                    {product.specs.material && (
                      <>
                        <div className="text-muted-foreground">Материал</div>
                        <div className="text-white font-medium">{product.specs.material}</div>
                      </>
                    )}
                    {product.specs.weight && (
                      <>
                        <div className="text-muted-foreground">Вес</div>
                        <div className="text-white font-medium">{product.specs.weight}</div>
                      </>
                    )}
                    {product.specs.discipline && (
                      <>
                        <div className="text-muted-foreground">Дисциплина</div>
                        <div className="text-white font-medium">{product.specs.discipline}</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-white/20 rounded-sm overflow-hidden h-14 bg-black/30">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-14 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-14 h-full flex items-center justify-center text-white font-bold text-lg border-x border-white/20">
                    {qty}
                  </div>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-14 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 rounded-sm flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all duration-300 ${
                    isAdded 
                      ? 'bg-success text-white' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20'
                  }`}
                >
                  {isAdded ? (
                    <><CheckCircle className="w-5 h-5" /> Добавлено</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> В корзину</>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
