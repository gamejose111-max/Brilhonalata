'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Booking } from './types';

const bookingsFilePath = path.join(process.cwd(), 'src', 'lib', 'bookings.json');

async function getBookingsFromFile(): Promise<Booking[]> {
  try {
    const data = await fs.readFile(bookingsFilePath, 'utf-8');
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data) as Booking[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []; // File doesn't exist, return empty array
    }
    // For other errors (like malformed JSON), log it and return an empty array
    // to prevent the app from crashing.
    console.error(`Failed to read or parse bookings.json:`, error);
    return [];
  }
}

async function saveBookingsToFile(bookings: Booking[]) {
  await fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2));
}

export async function getBookedSlots(date: string) {
  const bookings = await getBookingsFromFile();
  const dateOnly = new Date(date).toISOString().split('T')[0];

  return bookings
    .filter(
      (b) =>
        b.date.split('T')[0] === dateOnly && b.status === 'confirmed'
    )
    .map((b) => b.time);
}

const bookingSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(1, 'Telefone é obrigatório.'),
  serviceId: z.string().min(1, 'Selecione um serviço.'),
  date: z.date({ required_error: 'Selecione uma data.' }),
  time: z.string().min(1, 'Selecione um horário.'),
});

export async function createBooking(prevState: any, formData: FormData) {
  const validatedFields = bookingSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    serviceId: formData.get('serviceId'),
    date: new Date(formData.get('date') as string),
    time: formData.get('time'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      message: 'Dados inválidos. Por favor, verifique o formulário.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newBooking: Booking = {
    id: new Date().getTime().toString(),
    ...validatedFields.data,
    date: validatedFields.data.date.toISOString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    const bookings = await getBookingsFromFile();
    
    // Check for double booking
    const isSlotTaken = bookings.some(b => 
        b.date.split('T')[0] === newBooking.date.split('T')[0] && 
        b.time === newBooking.time &&
        b.status === 'confirmed'
    );

    if (isSlotTaken) {
        return {
            type: 'error',
            message: 'Este horário já foi reservado. Por favor, escolha outro.'
        }
    }

    bookings.push(newBooking);
    await saveBookingsToFile(bookings);

    // Simulate sending email
    console.log('--- Nova Solicitação de Agendamento ---');
    console.log('Cliente:', newBooking.name);
    console.log('Email:', newBooking.email);
    console.log('Serviço:', newBooking.serviceId);
    console.log('Data:', new Date(newBooking.date).toLocaleDateString('pt-PT'));
    console.log('Horário:', newBooking.time);
    console.log('------------------------------------');

    revalidatePath('/admin');
    revalidatePath('/agendar');

    return {
      type: 'success',
      message: 'Agendamento solicitado com sucesso! Entraremos em contato para confirmar.',
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
    };
  }
}

export async function getAppointments() {
  const bookings = await getBookingsFromFile();
  return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateAppointmentStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as 'confirmed' | 'declined';
  
  if (!id || !status) {
    return;
  }

  try {
    let bookings = await getBookingsFromFile();
    bookings = bookings.map(b => b.id === id ? { ...b, status } : b);
    await saveBookingsToFile(bookings);

    // Simulate sending email notification to customer
    const updatedBooking = bookings.find(b => b.id === id);
    if(updatedBooking) {
        console.log(`--- Status do Agendamento Atualizado para ${updatedBooking.email} ---`);
        console.log(`Seu agendamento para ${new Date(updatedBooking.date).toLocaleDateString('pt-PT')} às ${updatedBooking.time} foi ${status === 'confirmed' ? 'CONFIRMADO' : 'RECUSADO'}.`);
        console.log('------------------------------------');
    }
    
    revalidatePath('/admin');
    revalidatePath('/agendar');

  } catch (error) {
    console.error("Failed to update appointment status:", error);
  }
}
