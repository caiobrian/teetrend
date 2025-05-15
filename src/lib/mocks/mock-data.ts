export const PRODUCTS = [
  {
    id: 'camiseta-basica',
    title: 'Camiseta Básica',
    description:
      'Camiseta 100% algodão de alta qualidade, perfeita para o dia a dia. Confortável, durável e versátil.',
    price: 179.9,
    discountPrice: 159.0,
    rating: 4.5,
    reviewCount: 998,
    composition: '92% TENCEL™ modal e 8% elastano',
    features: [
      'Tecido leve e macio',
      'Confortável para uso diário',
      'Corte regular',
      'Gola redonda',
      'Produzido no Brasil',
    ],
    sizes: [
      { id: 'pp', label: 'PP', value: 'PP', available: true },
      { id: 'p', label: 'P', value: 'P', available: true },
      { id: 'm', label: 'M', value: 'M', available: true },
      { id: 'g', label: 'G', value: 'G', available: true },
      { id: 'gg', label: 'GG', value: 'GG', available: true },
      { id: 'xgg', label: 'XGG', value: 'XGG', available: false },
    ],
    colors: [
      {
        id: 'azul-marinho',
        label: 'Azul Marinho',
        value: 'azul-marinho',
        available: true,
        sizes: [
          { id: 'pp', label: 'PP', value: 'PP', available: true },
          { id: 'p', label: 'P', value: 'P', available: true },
          { id: 'm', label: 'M', value: 'M', available: true },
          { id: 'g', label: 'G', value: 'G', available: false },
          { id: 'gg', label: 'GG', value: 'GG', available: true },
          { id: 'xgg', label: 'XGG', value: 'XGG', available: false },
        ],
      },
      {
        id: 'off-white',
        label: 'Off-White',
        value: 'off-white',
        available: true,
        sizes: [
          { id: 'pp', label: 'PP', value: 'PP', available: false },
          { id: 'p', label: 'P', value: 'P', available: true },
          { id: 'm', label: 'M', value: 'M', available: true },
          { id: 'g', label: 'G', value: 'G', available: true },
          { id: 'gg', label: 'GG', value: 'GG', available: true },
          { id: 'xgg', label: 'XGG', value: 'XGG', available: false },
        ],
      },
      {
        id: 'verde',
        label: 'Verde',
        value: 'verde',
        available: true,
        sizes: [
          { id: 'pp', label: 'PP', value: 'PP', available: true },
          { id: 'p', label: 'P', value: 'P', available: true },
          { id: 'm', label: 'M', value: 'M', available: false },
          { id: 'g', label: 'G', value: 'G', available: true },
          { id: 'gg', label: 'GG', value: 'GG', available: false },
          { id: 'xgg', label: 'XGG', value: 'XGG', available: false },
        ],
      },
    ],
    images: {
      'azul-marinho': [
        {
          id: 'azul-marinho-1',
          url: '/images/product1/azul-marinho1.jpg',
          alt: 'Camiseta Azul Marinho - Vista Frontal',
        },
        {
          id: 'azul-marinho-2',
          url: '/images/product1/azul-marinho2.jpg',
          alt: 'Camiseta Azul Marinho - Vista Lateral',
        },
        {
          id: 'azul-marinho-3',
          url: '/images/product1/azul-marinho3.jpg',
          alt: 'Camiseta Azul Marinho - Vista Traseira',
        },
        {
          id: 'azul-marinho-4',
          url: '/images/product1/azul-marinho4.jpg',
          alt: 'Camiseta Azul Marinho - Detalhe',
        },
      ],
      'off-white': [
        {
          id: 'off-white-1',
          url: '/images/product1/off-white1.jpg',
          alt: 'Camiseta Off-White - Vista Frontal',
        },
        {
          id: 'off-white-2',
          url: '/images/product1/off-white2.jpg',
          alt: 'Camiseta Off-White - Vista Lateral',
        },
        {
          id: 'off-white-3',
          url: '/images/product1/off-white3.jpg',
          alt: 'Camiseta Off-White - Vista Traseira',
        },
        {
          id: 'off-white-4',
          url: '/images/product1/off-white4.jpg',
          alt: 'Camiseta Off-White - Detalhe',
        },
      ],
      verde: [
        {
          id: 'verde-1',
          url: '/images/product1/verde1.jpg',
          alt: 'Camiseta Verde - Detalhe',
        },
        {
          id: 'verde-2',
          url: '/images/product1/verde2.jpg',
          alt: 'Camiseta Verde - Vista Lateral',
        },
        {
          id: 'verde-3',
          url: '/images/product1/verde3.jpg',
          alt: 'Camiseta Verde - Vista Traseira',
        },
        {
          id: 'verde-4',
          url: '/images/product1/verde4.jpg',
          alt: 'Camiseta Verde - Vista Frontal',
        },
      ],
    },
    category: 'camisetas',
  },
]
