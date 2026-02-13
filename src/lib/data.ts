import type { Service } from './types';
import { Car, Paintbrush, Wrench } from 'lucide-react';

export const services: Service[] = [
  {
    id: 'polimento-basico',
    name: 'Polimento Básico',
    description: 'Remove marcas de redemoinho leves e realça o brilho da pintura. Ideal para carros com poucos sinais de desgaste.',
    Icon: Car,
    prices: [
      { vehicleType: 'Carro Pequeno', price: 'R$ 300' },
      { vehicleType: 'Carro Médio/SUV', price: 'R$ 400' },
      { vehicleType: 'Carro Grande/Caminhonete', price: 'R$ 500' },
    ],
  },
  {
    id: 'polimento-tecnico',
    name: 'Polimento Técnico',
    description: 'Correção aprofundada de imperfeições, remove arranhões médios e restaura o brilho profundo e original da pintura.',
    Icon: Wrench,
    prices: [
      { vehicleType: 'Carro Pequeno', price: 'R$ 600' },
      { vehicleType: 'Carro Médio/SUV', price: 'R$ 750' },
      { vehicleType: 'Carro Grande/Caminhonete', price: 'R$ 900' },
    ],
  },
  {
    id: 'vitrificacao-pintura',
    name: 'Vitrificação de Pintura',
    description: 'Aplicação de um revestimento cerâmico para proteção superior, brilho intenso e durabilidade de até 3 anos.',
    Icon: Paintbrush,
    prices: [
      { vehicleType: 'Carro Pequeno', price: 'R$ 1200' },
      { vehicleType: 'Carro Médio/SUV', price: 'R$ 1500' },
      { vehicleType: 'Carro Grande/Caminhonete', price: 'R$ 1800' },
    ],
  },
];

export const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];
