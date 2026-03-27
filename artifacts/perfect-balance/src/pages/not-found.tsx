import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Страница не найдена
          </p>
          <h1
            className="font-display text-white leading-none mb-4"
            style={{ fontSize: "clamp(80px, 20vw, 180px)", opacity: 0.08 }}
          >
            404
          </h1>
          <h2 className="font-display text-white text-3xl md:text-4xl mb-4 -mt-8 relative z-10">
            Такой страницы не существует
          </h2>
          <p className="text-white/50 text-base mb-10 max-w-md mx-auto">
            Возможно, ссылка устарела или адрес введён с ошибкой.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#c8a84b] hover:bg-[#a8882b] text-[#1a1a1a] px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" /> На главную
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 border border-[#c8a84b] text-[#c8a84b] hover:bg-[#c8a84b] hover:text-[#1a1a1a] px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
            >
              В каталог
            </Link>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
