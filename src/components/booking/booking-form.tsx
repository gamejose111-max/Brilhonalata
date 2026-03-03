'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { services, timeSlots } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(9, 'Telefone inválido.'),
  serviceId: z.string({ required_error: 'Por favor, selecione um serviço.' }),
  date: z.date({ required_error: 'Por favor, selecione uma data.' }),
  time: z.string({ required_error: 'Por favor, selecione um horário.' }),
});

export function BookingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const [isPending, setIsPending] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [minDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const selectedDate = form.watch('date');

  useEffect(() => {
    if (selectedDate && db) {
      const fetchSlots = async () => {
        setIsFetchingSlots(true);
        try {
          const dateOnly = selectedDate.toISOString().split('T')[0];
          const q = query(
            collection(db, 'appointments'),
            where('appointmentDateTime', '>=', dateOnly),
            where('status', '==', 'confirmed')
          );
          const querySnapshot = await getDocs(q);
          const slots = querySnapshot.docs
            .filter(doc => doc.data().appointmentDateTime.startsWith(dateOnly))
            .map(doc => doc.data().time || doc.data().appointmentDateTime.split('T')[1]?.substring(0, 5));
          
          setBookedSlots(slots as string[]);
        } catch (error) {
          console.error("Erro ao buscar horários:", error);
        } finally {
          setIsFetchingSlots(false);
        }
      };
      fetchSlots();
      form.setValue('time', '');
    }
  }, [selectedDate, db, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!db) return;
    setIsPending(true);
    
    try {
      const dateStr = data.date.toISOString().split('T')[0];
      const dateTimeStr = `${dateStr}T${data.time}:00Z`;

      await addDoc(collection(db, 'appointments'), {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        serviceId: data.serviceId,
        appointmentDateTime: dateTimeStr,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        vehicleMake: 'Não informado',
        vehicleModel: 'Não informado',
        vehicleYear: new Date().getFullYear(),
      });

      toast({
        title: 'Sucesso!',
        description: 'Seu pedido de agendamento foi enviado com sucesso! Aguarde nosso contacto.',
      });
      
      form.reset();
      router.push('/');
    } catch (error) {
      console.error("Erro ao agendar:", error);
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao processar o seu pedido. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Telefone (PT)</FormLabel>
                <FormControl>
                    <Input placeholder="912 345 678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <Controller
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviço Desejado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: pt })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < minDate || date.getDay() === 0 }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedDate && (
           <Controller
           control={form.control}
           name="time"
           render={({ field }) => (
             <FormItem className="space-y-3">
               <FormLabel>Horário</FormLabel>
               {isFetchingSlots ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                    >
                    {timeSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                        <FormItem key={slot} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value={slot} id={slot} disabled={isBooked} />
                            </FormControl>
                            <Label htmlFor={slot} className={cn(isBooked && "text-muted-foreground line-through")}>{slot}</Label>
                        </FormItem>
                        );
                    })}
                    </RadioGroup>
                </FormControl>
               )}
               <FormMessage />
             </FormItem>
           )}
         />
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Solicitar Agendamento
        </Button>
      </form>
    </Form>
  );
}
