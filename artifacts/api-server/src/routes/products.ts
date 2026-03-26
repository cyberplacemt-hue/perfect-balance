import { Router, type IRouter } from "express";
import {
  GetProductsResponse,
  GetProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const products = [
  {
    id: 1,
    name: "Perfect Balance №1",
    category: "horseshoes",
    sizes: "F 140×138×8 / H 133×136×8",
    size: null,
    package_qty: 20,
    price_pair: 819,
    price_box: 16380,
    badge: "Хит продаж",
    description:
      "Подкова для лёгких и средних лошадей. Идеальна для выездки и прогулочной езды. Качественная сталь, точная геометрия, удобная посадка на копыто.",
    specs: {
      material: "Сталь",
      weight: "300г/пара",
      for: "Лёгкие и средние лошади",
      discipline: "Выездка, прогулка",
    },
    image: "/images/product-horseshoe-1.png",
  },
  {
    id: 2,
    name: "Perfect Balance №2",
    category: "horseshoes",
    sizes: "F 146×142×8 / H 138×142×8",
    size: null,
    package_qty: 16,
    price_pair: 819,
    price_box: 14040,
    badge: null,
    description:
      "Универсальная подкова для лошадей среднего размера. Подходит для конкура и выездки. Самый популярный размер среди КСК.",
    specs: {
      material: "Сталь",
      weight: "320г/пара",
      for: "Средние лошади",
      discipline: "Конкур, выездка",
    },
    image: "/images/product-horseshoe-2.png",
  },
  {
    id: 3,
    name: "Perfect Balance №3",
    category: "horseshoes",
    sizes: "F 153×150×8 / H 146×150×8",
    size: null,
    package_qty: 16,
    price_pair: 819,
    price_box: 14040,
    badge: "Популярный",
    description:
      "Подкова для крупных спортивных лошадей. Рассчитана на интенсивную работу и высокие нагрузки. Широко применяется в конном спорте.",
    specs: {
      material: "Сталь",
      weight: "350г/пара",
      for: "Крупные лошади",
      discipline: "Спорт, конкур",
    },
    image: "/images/product-horseshoe-3.png",
  },
  {
    id: 4,
    name: "Perfect Balance №4",
    category: "horseshoes",
    sizes: "F 158×158×8 / H 153×158×8",
    size: null,
    package_qty: 16,
    price_pair: 845,
    price_box: 13520,
    badge: "Для крупных",
    description:
      "Максимальный размер для мощных лошадей с большими копытами. Усиленная конструкция для тяжёлых пород и рабочих лошадей.",
    specs: {
      material: "Сталь",
      weight: "380г/пара",
      for: "Мощные и тяжёлые лошади",
      discipline: "Рабочие, тяжёлые породы",
    },
    image: "/images/product-horseshoe-4.png",
  },
  {
    id: 5,
    name: "Гвоздь ковочный E3",
    category: "nails",
    sizes: null,
    size: "4.5 см",
    package_qty: 250,
    price_pair: null,
    price_box: 2470,
    badge: null,
    description:
      "Ковочные гвозди для тонких и средних стенок копыта. Подходят для молодых лошадей и лошадей с тонкой роговицей.",
    specs: null,
    image: "/images/product-nails-e3.png",
  },
  {
    id: 6,
    name: "Гвоздь ковочный E4",
    category: "nails",
    sizes: null,
    size: "4.75 см",
    package_qty: 250,
    price_pair: null,
    price_box: 2600,
    badge: "Популярный",
    description:
      "Универсальный ковочный гвоздь. Самый востребованный размер среди ковалей. Подходит для большинства лошадей.",
    specs: null,
    image: "/images/product-nails-e4.png",
  },
  {
    id: 7,
    name: "Гвоздь ковочный E5",
    category: "nails",
    sizes: null,
    size: "5.1 см",
    package_qty: 250,
    price_pair: null,
    price_box: 2730,
    badge: null,
    description:
      "Гвозди для крупных лошадей с толстой стенкой копыта. Обеспечивают надёжную фиксацию подковы при высоких нагрузках.",
    specs: null,
    image: "/images/product-nails-e5.png",
  },
];

router.get("/products", async (req, res): Promise<void> => {
  const { category } = req.query;
  let filtered = products;
  if (category && typeof category === "string") {
    filtered = products.filter((p) => p.category === category);
  }
  res.json(GetProductsResponse.parse(filtered));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid product id" });
    return;
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

export default router;
