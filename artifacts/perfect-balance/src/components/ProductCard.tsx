import { Link } from "wouter";
import { ShoppingCart, Check } from "lucide-react";
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
      <div className="rounded-xl overflow-hidden h-full flex flex-col border border-white/8 bg-[#141414] hover:border-[#c8a84b]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-black/50 p-6 flex items-center justify-center">
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-md">
              {product.badge}
            </div>
          )}
          <img
            src={product.image}
            alt={`${product.name} — подкова БУЛАТ`}
            className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-108 transition-transform duration-700 ease-out"
            style={{ transform: "scale(1)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/product-placeholder.png`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-5 flex flex-col flex-grow border-t border-white/5">
          <div className="text-[10px] text-[#c8a84b] mb-1.5 uppercase tracking-[0.15em] font-semibold">
            {product.category}
          </div>
          <h3 className="font-display text-base text-white mb-1 leading-snug group-hover:text-[#c8a84b] transition-colors duration-300">
            {product.name}
          </h3>
          {product.sizes && (
            <p className="text-[11px] text-white/35 mb-3 font-mono">{product.sizes}</p>
          )}
          {product.size && (
            <p className="text-[11px] text-white/35 mb-3">Размер: {product.size}</p>
          )}

          <div className="mt-auto pt-4 flex items-end justify-between gap-3 border-t border-white/5">
            <div>
              <p className="text-[10px] text-white/40 mb-0.5">за уп. ({product.package_qty} шт.)</p>
              <p className="text-xl font-bold text-white leading-none">
                {product.price_box.toLocaleString('ru-RU')} <span className="text-sm font-medium text-white/70">₽</span>
              </p>
              {product.price_pair && (
                <p className="text-[11px] text-white/35 mt-0.5">{product.price_pair.toLocaleString('ru-RU')} ₽ / пара</p>
              )}
            </div>
            <button
              onClick={handleAdd}
              aria-label={isAdded ? "Добавлено в корзину" : "Добавить в корзину"}
              className={`min-w-[40px] min-h-[40px] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b] ${
                isAdded
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-white/8 text-white/70 hover:bg-[#c8a84b] hover:text-[#1a1a1a] hover:scale-110'
              }`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
