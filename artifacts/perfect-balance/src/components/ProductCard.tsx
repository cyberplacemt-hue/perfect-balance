import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      qty: 1,
      unit: "уп.",
      price: product.price_box
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/product/${product.id}`} className="block group h-full">
      <div className="glass rounded-xl overflow-hidden h-full flex flex-col hover-lift">
        <div className="relative aspect-square overflow-hidden bg-black/40 p-6 flex items-center justify-center">
          {product.badge && (
            <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm">
              {product.badge}
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/product-placeholder.png`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="text-xs text-primary mb-2 uppercase tracking-wider font-semibold">
            {product.category}
          </div>
          <h3 className="font-display text-lg text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">За упаковку ({product.package_qty} шт)</p>
              <p className="text-xl font-bold text-white">
                {product.price_box.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <button 
              onClick={handleAdd}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isAdded ? 'bg-success text-white' : 'bg-white/10 text-white hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
