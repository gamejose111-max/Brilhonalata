import type { Service } from './types';
import { Car, Paintbrush, Wrench, ShieldCheck, SprayCan } from 'lucide-react';

export const services: Service[] = [
  {
    id: 'polimento-basico',
    name: 'Polimento Básico',
    description: 'Remove marcas de redemoinho leves e realça o brilho da pintura. Ideal para carros com poucos sinais de desgaste.',
    Icon: Car,
    prices: [
      { vehicleType: 'Carro Pequeno', price: '€ 300' },
      { vehicleType: 'Carro Médio/SUV', price: '€ 400' },
      { vehicleType: 'Carro Grande/Caminhonete', price: '€ 500' },
    ],
  },
  {
    id: 'polimento-tecnico',
    name: 'Polimento Técnico',
    description: 'Correção aprofundada de imperfeições, remove arranhões médios e restaura o brilho profundo e original da pintura.',
    Icon: Wrench,
    prices: [
      { vehicleType: 'Carro Pequeno', price: '€ 600' },
      { vehicleType: 'Carro Médio/SUV', price: '€ 750' },
      { vehicleType: 'Carro Grande/Caminhonete', price: '€ 900' },
    ],
  },
  {
    id: 'vitrificacao-pintura',
    name: 'Vitrificação de Pintura',
    description: 'Aplicação de um revestimento cerâmico para proteção superior, brilho intenso e durabilidade de até 3 anos.',
    Icon: ShieldCheck,
    prices: [
      { vehicleType: 'Carro Pequeno', price: '€ 1200' },
      { vehicleType: 'Carro Médio/SUV', price: '€ 1500' },
      { vehicleType: 'Carro Grande/Caminhonete', price: '€ 1800' },
    ],
  },
  {
    id: 'reparo-pintura',
    name: 'Reparo de Pintura',
    description: 'Correção de danos localizados, como arranhões, lascas e pequenos amassados, restaurando a aparência original da peça.',
    Icon: SprayCan,
    prices: [
      { vehicleType: 'Por Peça', price: 'A partir de € 350' },
      { vehicleType: 'Para-choque', price: 'A partir de € 400' },
      { vehicleType: 'Teto ou Capô', price: 'A partir de € 500' },
    ],
  },
  {
    id: 'pintura-completa',
    name: 'Pintura Completa',
    description: 'Renovação total da cor do veículo. Preparação completa da superfície para um acabamento perfeito e duradouro.',
    Icon: Paintbrush,
    prices: [
      { vehicleType: 'Carro Pequeno', price: 'Sob consulta' },
      { vehicleType: 'Carro Médio/SUV', price: 'Sob consulta' },
      { vehicleType: 'Carro Grande', price: 'Sob consulta' },
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
