
const { randomUUID } = require('crypto');

const products = [
  { id:1, name:"БУЛАТ ПРО №1", category:"Подковы", sizes:"F 140×138×8 / H 133×136×8", size:null, package_qty:20, price_pair:819, price_box:16380, badge:"Хит продаж", description:"Подкова для лёгких и средних лошадей. Идеальна для выездки и прогулочной езды. Качественная сталь, точная геометрия, удобная посадка на копыто.", specs:{material:"Сталь",weight:"300г/пара",for:"Лёгкие и средние лошади",discipline:"Выездка, прогулка"}, image:"/images/product-horseshoe-1.png" },
  { id:2, name:"БУЛАТ ПРО №2", category:"Подковы", sizes:"F 146×142×8 / H 138×142×8", size:null, package_qty:16, price_pair:819, price_box:14040, badge:null, description:"Универсальная подкова для лошадей среднего размера. Подходит для конкура и выездки. Самый популярный размер среди КСК.", specs:{material:"Сталь",weight:"320г/пара",for:"Средние лошади",discipline:"Конкур, выездка"}, image:"/images/product-horseshoe-2.png" },
  { id:3, name:"БУЛАТ ПРО №3", category:"Подковы", sizes:"F 153×150×8 / H 146×150×8", size:null, package_qty:16, price_pair:819, price_box:14040, badge:"Популярный", description:"Подкова для крупных спортивных лошадей. Рассчитана на интенсивную работу и высокие нагрузки. Широко применяется в конном спорте.", specs:{material:"Сталь",weight:"350г/пара",for:"Крупные лошади",discipline:"Спорт, конкур"}, image:"/images/product-horseshoe-3.png" },
  { id:4, name:"БУЛАТ ПРО №4", category:"Подковы", sizes:"F 158×158×8 / H 153×158×8", size:null, package_qty:16, price_pair:845, price_box:13520, badge:"Для крупных", description:"Максимальный размер для мощных лошадей с большими копытами. Усиленная конструкция для тяжёлых пород и рабочих лошадей.", specs:{material:"Сталь",weight:"380г/пара",for:"Мощные и тяжёлые лошади",discipline:"Рабочие, тяжёлые породы"}, image:"/images/product-horseshoe-4.png" },
  { id:5, name:"Гвозди БУЛАТ E3", category:"Гвозди", sizes:null, size:"4.5 см", package_qty:250, price_pair:null, price_box:2470, badge:null, description:"Ковочные гвозди для тонких и средних стенок копыта. Подходят для молодых лошадей и лошадей с тонкой роговицей.", specs:null, image:"/images/product-nails-e3.png" },
  { id:6, name:"Гвозди БУЛАТ E4", category:"Гвозди", sizes:null, size:"4.75 см", package_qty:250, price_pair:null, price_box:2600, badge:"Популярный", description:"Универсальный ковочный гвоздь. Самый востребованный размер среди ковалей. Подходит для большинства лошадей.", specs:null, image:"/images/product-nails-e4.png" },
  { id:7, name:"Гвозди БУЛАТ E5", category:"Гвозди", sizes:null, size:"5.1 см", package_qty:250, price_pair:null, price_box:2730, badge:null, description:"Гвозди для крупных лошадей с толстой стенкой копыта. Обеспечивают надёжную фиксацию подковы при высоких нагрузках.", specs:null, image:"/images/product-nails-e5.png" },
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname.replace(/^\/api/, '');

  if (req.method === 'GET' && path === '/health') {
    return res.json({ status: 'ok' });
  }

  if (req.method === 'GET' && path === '/products') {
    const category = url.searchParams.get('category');
    const result = category ? products.filter(p => p.category === category) : products;
    return res.end(JSON.stringify(result));
  }

  if (req.method === 'GET' && path.startsWith('/products/')) {
    const id = parseInt(path.split('/')[2], 10);
    const product = products.find(p => p.id === id);
    if (!product) { res.statusCode = 404; return res.end(JSON.stringify({ error: 'Товар не найден' })); }
    return res.end(JSON.stringify(product));
  }

  if (req.method === 'POST' && path === '/order') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { name, phone, items } = JSON.parse(body || '{}');
      if (!name || !phone || !items) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'Заполните обязательные поля' })); }
      const orderId = randomUUID().slice(0, 8).toUpperCase();
      res.statusCode = 201;
      res.end(JSON.stringify({ orderId, message: 'Заказ #' + orderId + ' принят. Мы свяжемся с вами в ближайшее время.' }));
    });
    return;
  }

  if (req.method === 'POST' && path === '/contact') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { name, email, message } = JSON.parse(body || '{}');
      if (!name || !email || !message) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'Заполните обязательные поля' })); }
      res.end(JSON.stringify({ message: 'Ваше сообщение получено. Мы свяжемся с вами в ближайшее время!' }));
    });
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not found' }));
};
