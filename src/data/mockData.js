export const initialStores = [
  {
    id: 'mercado-central',
    name: 'Mercado Central',
    neighborhood: 'Centro',
    address: 'Av. Mostardeiro, 1200 - Centro, Cidreira',
    hours: 'Seg a Sáb: 07:30 às 21:00 • Dom: 08:00 às 20:00',
    whatsapp: '51999998888',
    color: '#0055ff',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
    logo: '🏪',
    login: { user: 'central', pass: '123' },
    ratings: {
      app: { score: 4.8, count: 47 },
      google: { score: 4.6, count: 182, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Carlos M. (Salinas)', source: 'app', rating: 5, date: 'Ontem', text: 'Melhor preço de carne de Cidreira e atendimento nota 10!' },
      { id: 2, author: 'Mariana Silva', source: 'google', rating: 5, date: 'Há 1 semana', text: 'Muito organizado, açougue e hortifruti sempre frescos.' },
      { id: 3, author: 'Roberto Dias (Centro)', source: 'app', rating: 4, date: 'Há 2 semanas', text: 'Ótimas promoções de cerveja no fim de semana.' }
    ],
    flyerUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'super-litoral',
    name: 'Super Litoral',
    neighborhood: 'Centro',
    address: 'Av. Fausto Borba Prates, 350 - Centro, Cidreira',
    hours: 'Todos os dias: 08:00 às 22:00',
    whatsapp: '51988887777',
    color: '#ff7700',
    coverImage: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&auto=format&fit=crop&q=80',
    logo: '🛒',
    login: { user: 'litoral', pass: '123' },
    ratings: {
      app: { score: 4.5, count: 34 },
      google: { score: 4.4, count: 120, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Fabio Castro', source: 'google', rating: 5, date: 'Há 3 dias', text: 'Padaria excelente, pão quentinho saindo toda hora.' },
      { id: 2, author: 'Letícia P. (Costa do Sol)', source: 'app', rating: 4, date: 'Há 5 dias', text: 'Preço justo na cerveja e gelo sempre disponível.' }
    ],
    flyerUrl: null
  },
  {
    id: 'super-salinas',
    name: 'Super Salinas',
    neighborhood: 'Salinas',
    address: 'Av. Beira Mar, 890 - Salinas, Cidreira',
    hours: 'Seg a Dom: 08:00 às 20:30',
    whatsapp: '51977776666',
    color: '#28a745',
    coverImage: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&auto=format&fit=crop&q=80',
    logo: '🥩',
    login: { user: 'salinas', pass: '123' },
    ratings: {
      app: { score: 4.9, count: 52 },
      google: { score: 4.7, count: 95, url: 'https://maps.google.com' }
    },
    reviews: [
      { id: 1, author: 'Marcos Veranista', source: 'app', rating: 5, date: 'Ontem', text: 'Salvou nosso churrasco na praia! Carvão e carne no melhor preço de Salinas.' },
      { id: 2, author: 'Cláudia Ramos', source: 'google', rating: 5, date: 'Há 1 mês', text: 'Mercadinho familiar muito simpático e com ótimas ofertas.' }
    ],
    flyerUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80'
  }
];

export const initialOffers = [
  {
    id: 1,
    storeId: 'mercado-central',
    name: 'Cerveja Brahma 350ml lata',
    category: 'Bebidas',
    originalPrice: '3.49',
    promoPrice: '2.99',
    validityLabel: 'Válido até domingo',
    photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80',
    views: 420
  },
  {
    id: 2,
    storeId: 'super-litoral',
    name: 'Contra Filé Friboi (KG)',
    category: 'Açougue',
    originalPrice: '42.00',
    promoPrice: '34.90',
    validityLabel: 'Até durar o estoque',
    photoUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80',
    views: 890
  },
  {
    id: 3,
    storeId: 'mercado-central',
    name: 'Leite Integral Tirol 1L',
    category: 'Padaria',
    originalPrice: '5.20',
    promoPrice: '4.59',
    validityLabel: 'Válido até terça-feira',
    photoUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    views: 310
  },
  {
    id: 4,
    storeId: 'super-salinas',
    name: 'Carvão Vegetal 3kg',
    category: 'Outros',
    originalPrice: '16.00',
    promoPrice: '12.90',
    validityLabel: 'Válido até domingo',
    photoUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80',
    views: 215
  }
];
