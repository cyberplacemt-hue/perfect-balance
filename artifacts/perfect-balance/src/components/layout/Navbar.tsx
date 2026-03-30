import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Phone } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
  ];

  const anchorLinks = [
    { id: "history", label: "История" },
    { id: "contact", label: "Контакты" },
  ];

  const handleAnchorClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.png`} 
            alt="Логотип БУЛАТ" 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-display text-xl tracking-wide text-white group-hover:text-primary transition-colors">
            БУЛАТ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {anchorLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleAnchorClick(e, link.id)}
              className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary text-white/80 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="tel:89150016878"
            className="hidden lg:flex items-center gap-1.5 text-white/70 hover:text-primary transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            8 (915) 001-68-78
          </a>
          <Link href="/cart" className="relative group p-2">
            <ShoppingBag className="w-5 h-5 text-white/80 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link href="/catalog" className="hidden sm:inline-flex items-center justify-center px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm font-medium uppercase text-sm tracking-widest">
            Заказать
          </Link>

          <button 
            className="md:hidden p-2 text-white/80 hover:text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col pt-20 px-6 pb-6"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 items-center justify-center h-full">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="font-display text-3xl text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {anchorLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { setMobileMenuOpen(false); handleAnchorClick(e, link.id); }}
                  className="font-display text-3xl text-white hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <Link 
                href="/catalog" 
                className="mt-8 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-sm"
              >
                Перейти в каталог
              </Link>
              <a
                href="tel:89150016878"
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                8 (915) 001-68-78
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
