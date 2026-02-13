import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  prices: {
    vehicleType: string;
    price: string;
  }[];
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string; // ISO string for date
  time: string;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: string; // ISO string
};
