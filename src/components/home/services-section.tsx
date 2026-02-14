import { services } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ServicesSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section id="servicos" className={!showHeader ? 'pt-6' : ''}>
      {showHeader && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferecemos uma gama completa de serviços para cuidar da estética do seu veículo com a máxima qualidade.
          </p>
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <service.Icon className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-center">{service.name}</CardTitle>
              <CardDescription className="text-center !mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col justify-end">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Veículo</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.prices.map((priceInfo) => (
                    <TableRow key={priceInfo.vehicleType}>
                      <TableCell className="font-medium">
                        {priceInfo.vehicleType}
                      </TableCell>
                      <TableCell className="text-right">
                        {priceInfo.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
