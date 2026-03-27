import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/ProductCard";
import { useGetProducts } from "@workspace/api-client-react";
import { Search, Filter } from "lucide-react";

export default function Catalog() {
  const [location] = useLocation();
  const [category, setCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "Все";
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Каталог — БУЛАТ";
    return () => { document.title = "БУЛАТ — Профессиональные подковы"; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    setCategory(cat || "Все");
    setSearch("");
  }, [location]);
  
  const { data: products, isLoading } = useGetProducts(
    category !== "Все" ? { category } : undefined
  );

  const categories = ["Все", "Подковы", "Гвозди", "Инструменты"];

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <AppLayout>
      <div className="pt-24 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-6">Каталог продукции</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Полный ассортимент профессиональных товаров для ковки. 
            Продажа оптом и в розницу.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div className="glass p-6 rounded-xl">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Поиск..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4 uppercase tracking-wider text-xs">
                  <Filter className="w-4 h-4" /> Категории
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`text-left text-sm py-2 px-3 rounded-sm transition-colors ${
                        category === cat 
                          ? "bg-primary/20 text-primary font-medium border border-primary/30" 
                          : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="glass rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="glass rounded-xl p-12 text-center">
                <h3 className="text-xl text-white font-display mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации.</p>
                <button 
                  onClick={() => {setCategory("Все"); setSearch("");}}
                  className="mt-6 text-primary border-b border-primary pb-1"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
