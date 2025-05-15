export const SHIPPING_METHODS = [
  {
    id: 'standard',
    title: 'Entrega Padrão',
    deliveryTime: '3-5 dias úteis',
    price: 0,
    icon: 'check',
    theme: 'green',
  },
  {
    id: 'express',
    title: 'Entrega Expressa',
    deliveryTime: '1-2 dias úteis',
    price: 12.9,
    icon: 'flash',
    theme: 'blue',
  },
] as const
