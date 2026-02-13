import { BookingForm } from '@/components/booking/booking-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AgendarPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Agende seu Horário</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para solicitar seu agendamento. Entraremos em contato em breve para confirmar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
