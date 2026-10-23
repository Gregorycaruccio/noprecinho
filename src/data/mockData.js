export const initialStores = [
  // 1. NAZARÉ
  {
    id: 'acougue-do-gaucho',
    name: 'Açougue do Gaúcho',
    neighborhood: 'Nazaré',
    address: 'Av. Fausto Borba Prates, 3880 - Nazaré / Centro, Cidreira',
    hours: 'Seg a Sáb: 08:00 às 20:00 • Dom: 08:00 às 13:00',
    whatsapp: '51994221111',
    color: '#b91c1c',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    logo: '🥩',
    login: { user: 'gaucho', pass: '123' },
    instagram: '@acouguedogauchocidreira',
    ratings: {
      app: { score: 5.0, count: 64 },
      google: { score: 4.8, count: 189, url: 'https://share.google/ZgHvWHhHmCHhb7Omk' }
    },
    reviews: [
      { id: 1, author: 'Lucas Martins (Cidreira)', source: 'app', rating: 5, date: 'Ontem', text: 'A Quarta da Gauchada tem o melhor preço de carne do litoral! A costela minga e o vazio são diferenciados.' },
      { id: 2, author: 'Rodrigo Becker', source: 'google', rating: 5, date: 'Há 3 dias', text: 'Atendimento nota 10 e a tele-entrega pelo WhatsApp é muito rápida. Tradição pura.' },
      { id: 3, author: 'Juliana P. (Nazaré)', source: 'app', rating: 5, date: 'Há 1 semana', text: 'Carnes sempre frescas, limpas e no preço justo. Recomendo de olhos fechados!' }
    ],
    flyerUrl: './acougue-gaucho-tabloide.jpg'
  },

  // 2. CENTRO
  {
    id: 'asun-cidreira',
    name: 'Asun Supermercados',
    neighborhood: 'Centro',
    address: 'Rua Cauby Araçatuba Nunes da Silveira, 1918 - Centro, Cidreira',
    hours: 'Seg a Sáb: 07:30 às 21:00 • Dom: 08:00 às 20:00',
    whatsapp: '51981234567',
    color: '#e11d48',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
    logo: '🔴',
    login: { user: 'asun', pass: '123' },
    ratings: {
      app: { score: 4.7, count: 85 },
      google: { score: 4.5, count: 420, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Mariana Silva', source: 'google', rating: 5, date: 'Há 1 semana', text: 'Muito organizado, hortifruti e padaria sempre frescos.' },
      { id: 2, author: 'Paulo R. (Centro)', source: 'app', rating: 4, date: 'Há 2 semanas', text: 'Excelente variedade e estacionamento fácil.' }
    ],
    flyerUrl: null
  },
  {
    id: 'nunes-supermercado',
    name: 'Nunes Supermercado',
    neighborhood: 'Centro',
    address: 'Av. Fausto Borba Prates, 2716 - Centro, Cidreira',
    hours: 'Todos os dias: 08:00 às 21:00',
    whatsapp: '51982345678',
    color: '#0284c7',
    coverImage: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&auto=format&fit=crop&q=80',
    logo: '🛒',
    login: { user: 'nunes', pass: '123' },
    ratings: {
      app: { score: 4.6, count: 42 },
      google: { score: 4.4, count: 156, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Cláudio Ferreira', source: 'app', rating: 5, date: 'Ontem', text: 'Mercado tradicional de Cidreira, bom preço e atendimento cordial.' }
    ],
    flyerUrl: null
  },
  {
    id: 'vem-que-tem',
    name: 'Supermercado Vem Que Tem',
    neighborhood: 'Centro',
    address: 'Av. Fausto Borba Prates, 3150 - Centro, Cidreira',
    hours: 'Seg a Sáb: 08:00 às 20:30 • Dom: 08:00 às 13:00',
    whatsapp: '51983456789',
    color: '#ea580c',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    logo: '💥',
    login: { user: 'vemquetem', pass: '123' },
    ratings: {
      app: { score: 4.5, count: 39 },
      google: { score: 4.3, count: 110, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Fernanda Lima', source: 'google', rating: 5, date: 'Há 4 dias', text: 'Preço ótimo em produtos de limpeza e bazar.' }
    ],
    flyerUrl: null
  },

  // 3. SALINAS
  {
    id: 'mercado-santos-salinas',
    name: 'Mercado Santos',
    neighborhood: 'Salinas',
    address: 'Rua Nilton Teixeira, 420 - Salinas, Cidreira',
    hours: 'Seg a Dom: 08:00 às 20:30',
    whatsapp: '51984567890',
    color: '#16a34a',
    coverImage: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&auto=format&fit=crop&q=80',
    logo: '🏖️',
    login: { user: 'santos', pass: '123' },
    ratings: {
      app: { score: 4.8, count: 51 },
      google: { score: 4.6, count: 98, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Marcos Veranista', source: 'app', rating: 5, date: 'Ontem', text: 'Salva os churrascos em Salinas! Bebidas sempre geladas e carvão na mão.' }
    ],
    flyerUrl: null
  },

  // 4. COSTA DO SOL
  {
    id: 'mercado-wolf-costadosol',
    name: 'Mercado Wolf',
    neighborhood: 'Costa do Sol',
    address: 'Av. Fausto Borba Prates, 6100 - Costa do Sol, Cidreira',
    hours: 'Todos os dias: 08:00 às 20:00',
    whatsapp: '51985678901',
    color: '#7c3aed',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
    logo: '🐺',
    login: { user: 'wolf', pass: '123' },
    ratings: {
      app: { score: 4.7, count: 33 },
      google: { score: 4.5, count: 76, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Gabriel Souza', source: 'app', rating: 5, date: 'Há 3 dias', text: 'Muito conveniente para quem fica na Costa do Sol. Tem de tudo um pouco.' }
    ],
    flyerUrl: null
  },

  // 5. PARQUE DOS PINOS
  {
    id: 'mercado-ju-parquedospinos',
    name: 'Mercado Jú',
    neighborhood: 'Parque dos Pinos',
    address: 'Av. Alfredo Pedro da Silva, 310 - Parque dos Pinos, Cidreira',
    hours: 'Seg a Sáb: 08:00 às 19:30 • Dom: 08:00 às 13:00',
    whatsapp: '51986789012',
    color: '#059669',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    logo: '🌲',
    login: { user: 'ju', pass: '123' },
    ratings: {
      app: { score: 4.9, count: 28 },
      google: { score: 4.7, count: 64, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Tatiana Rocha', source: 'app', rating: 5, date: 'Ontem', text: 'Atendimento muito carinhoso da dona Jú, pão francês sempre quentinho.' }
    ],
    flyerUrl: null
  }
];

export const initialOffers = [
  // 1. Açougue do Gaúcho (Nazaré) - Quarta da Gauchada
  {
    id: 101,
    storeId: 'acougue-do-gaucho',
    name: 'Costela Minga (KG)',
    category: 'Açougue',
    originalPrice: '32.90',
    promoPrice: '24.99',
    validityLabel: '🔥 Quarta da Gauchada',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    views: 1240
  },
  {
    id: 102,
    storeId: 'acougue-do-gaucho',
    name: 'Patinho Bovino Selecionado (KG)',
    category: 'Açougue',
    originalPrice: '48.90',
    promoPrice: '40.99',
    validityLabel: '🔥 Quarta da Gauchada',
    photoUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80',
    views: 980
  },
  {
    id: 103,
    storeId: 'acougue-do-gaucho',
    name: 'Vazio Bovino Nobre (KG)',
    category: 'Açougue',
    originalPrice: '56.00',
    promoPrice: '49.99',
    validityLabel: '🔥 Quarta da Gauchada',
    photoUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop&q=80',
    views: 1420
  },
  {
    id: 104,
    storeId: 'acougue-do-gaucho',
    name: 'Paleta Suína com Pele (KG)',
    category: 'Açougue',
    originalPrice: '14.90',
    promoPrice: '8.99',
    validityLabel: '🔥 Quarta da Gauchada',
    photoUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80',
    views: 890
  },

  // 2. Asun Supermercados (Centro)
  {
    id: 201,
    storeId: 'asun-cidreira',
    name: 'Cerveja Brahma 350ml lata',
    category: 'Bebidas',
    originalPrice: '3.49',
    promoPrice: '2.89',
    validityLabel: 'Válido até domingo',
    photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80',
    views: 850
  },
  {
    id: 202,
    storeId: 'asun-cidreira',
    name: 'Costela Minga (KG)',
    category: 'Açougue',
    originalPrice: '34.90',
    promoPrice: '27.90',
    validityLabel: 'Fim de semana',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    views: 640
  },

  // 3. Nunes Supermercado (Centro)
  {
    id: 301,
    storeId: 'nunes-supermercado',
    name: 'Leite Integral Tirol 1L',
    category: 'Padaria',
    originalPrice: '5.20',
    promoPrice: '4.49',
    validityLabel: 'Válido até terça-feira',
    photoUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    views: 430
  },

  // 4. Mercado Santos (Salinas)
  {
    id: 401,
    storeId: 'mercado-santos-salinas',
    name: 'Carvão Vegetal 3kg',
    category: 'Outros',
    originalPrice: '16.00',
    promoPrice: '12.50',
    validityLabel: 'Promoção Verão',
    photoUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80',
    views: 380
  },
  {
    id: 402,
    storeId: 'mercado-santos-salinas',
    name: 'Cerveja Skol 350ml lata',
    category: 'Bebidas',
    originalPrice: '3.39',
    promoPrice: '2.79',
    validityLabel: 'Válido até domingo',
    photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80',
    views: 290
  },

  // 5. Mercado Wolf (Costa do Sol)
  {
    id: 501,
    storeId: 'mercado-wolf-costadosol',
    name: 'Costela Bovina Tradicional (KG)',
    category: 'Açougue',
    originalPrice: '33.90',
    promoPrice: '28.90',
    validityLabel: 'Até durar o estoque',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    views: 260
  },

  // 6. Mercado Jú (Parque dos Pinos)
  {
    id: 601,
    storeId: 'mercado-ju-parquedospinos',
    name: 'Pão Francês Fresquinho (KG)',
    category: 'Padaria',
    originalPrice: '14.00',
    promoPrice: '10.90',
    validityLabel: 'Toda manhã',
    photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    views: 195
  }
];
