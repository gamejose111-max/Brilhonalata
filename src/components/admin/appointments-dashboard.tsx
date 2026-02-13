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
import type { Booking } from '@/lib/types';
import { services } from '@/lib/data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, X } from 'lucide-react';
import { updateAppointmentStatus } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function StatusBadge({ status }: { status: Booking['status'] }) {
  const variant = {
    pending: 'secondary',
    confirmed: 'default',
    declined: 'destructive',
  } as const;
  const text = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    declined: 'Recusado',
  };
  return <Badge variant={variant[status]}>{text[status]}</Badge>;
}

function Actions({ appointment }: { appointment: Booking }) {
    if (appointment.status !== 'pending') {
        return <span className="text-sm text-muted-foreground">Processado</span>;
    }
    
    return (
        <div className="flex gap-2">
            <form action={updateAppointmentStatus}>
                <input type="hidden" name="id" value={appointment.id} />
                <input type="hidden" name="status" value="confirmed" />
                <Button variant="ghost" size="icon" type="submit" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Confirmar</span>
                </Button>
            </form>
            <form action={updateAppointmentStatus}>
                <input type="hidden" name="id" value={appointment.id} />
                <input type="hidden" name="status" value="declined" />
                <Button variant="ghost" size="icon" type="submit" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Recusar</span>
                </Button>
            </form>
        </div>
    );
}


export default function AppointmentsDashboard({
  appointments,
}: {
  appointments: Booking[];
}) {

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhum agendamento</CardTitle>
          <CardDescription>
            Ainda não há solicitações de agendamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Quando um cliente solicitar um agendamento, ele aparecerá aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Serviço</TableHead>
              <TableHead>Data & Hora</TableHead>
              <TableHead className="hidden lg:table-cell">Contato</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const service = services.find((s) => s.id === appointment.serviceId);
              return (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">{appointment.name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {service?.name || 'Não encontrado'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.date), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}{' '}
                    às {appointment.time}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col">
                        <span>{appointment.email}</span>
                        <span className="text-muted-foreground">{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={appointment.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Actions appointment={appointment}/>
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
