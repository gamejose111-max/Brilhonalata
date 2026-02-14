'use client';

import { useEffect, useState, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { createBooking, getBookedSlots } from '@/lib/actions';
import { services, timeSlots } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  phone: z.string().min(10, 'Telefone inválido.'),
  serviceId: z.string({ required_error: 'Por favor, selecione um serviço.' }),
  date: z.date({ required_error: 'Por favor, selecione uma data.' }),
  time: z.string({ required_error: 'Por favor, selecione um horário.' }),
});

export function BookingForm() {
  const { toast } = useToast();
  const [initialState, formAction, isPending] = useActionState(createBooking, { type: 'initial' });
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
    if (initialState.type === 'success') {
      toast({
        title: 'Sucesso!',
        description: initialState.message,
      });
      form.reset();
    } else if (initialState.type === 'error') {
      toast({
        title: 'Erro!',
        description: initialState.message,
        variant: 'destructive',
      });
    }
  }, [initialState, toast, form]);
  
  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        setIsFetchingSlots(true);
        const slots = await getBookedSlots(selectedDate.toISOString());
        setBookedSlots(slots);
        setIsFetchingSlots(false);
      };
      fetchSlots();
      form.resetField('time');
    }
  }, [selectedDate, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    });
    formAction(formData);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
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
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviço Desejado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        format(field.value, 'PPP', { locale: ptBR })
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
           <FormField
           control={form.control}
           name="time"
           render={({ field }) => (
             <FormItem className="space-y-3">
               <FormLabel>Horário</FormLabel>
               {isFetchingSlots ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
