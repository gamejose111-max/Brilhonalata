'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Check, X, Loader2 } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function StatusBadge({ status }: { status: string }) {
  const variant = {
    pending: 'secondary',
    confirmed: 'default',
    declined: 'destructive',
    accepted: 'default',
    rejected: 'destructive',
    completed: 'outline',
    cancelled: 'ghost',
  } as const;
  
  const text = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    declined: 'Recusado',
    accepted: 'Aceite',
    rejected: 'Rejeitado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  } as const;

  return <Badge variant={variant[status as keyof typeof variant] || 'secondary'}>{text[status as keyof typeof text] || status}</Badge>;
}

export default function AppointmentsDashboard() {
  const db = useFirestore();
  
  const appointmentsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: appointments, isLoading } = useCollection(appointmentsQuery);

  const handleUpdateStatus = async (id: string, status: string) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'appointments', id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhum agendamento</CardTitle>
          <CardDescription>
            Ainda não há solicitações de agendamento no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Quando um cliente solicitar um agendamento, ele aparecerá aqui automaticamente.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Serviço</TableHead>
              <TableHead>Data & Hora</TableHead>
              <TableHead className="hidden lg:table-cell">Contacto</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const service = services.find((s) => s.id === appointment.serviceId);
              let formattedDate = 'Data inválida';
              try {
                if (appointment.appointmentDateTime) {
                  formattedDate = format(new Date(appointment.appointmentDateTime), 'dd/MM/yyyy HH:mm', { locale: pt });
                }
              } catch (e) {}

              return (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">{appointment.customerName}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {service?.name || 'Serviço Personalizado'}
                  </TableCell>
                  <TableCell>
                    {formattedDate}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col text-xs">
                        <span>{appointment.customerEmail}</span>
                        <span className="text-muted-foreground">{appointment.customerPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={appointment.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {appointment.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleUpdateStatus(appointment.id, 'declined')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
