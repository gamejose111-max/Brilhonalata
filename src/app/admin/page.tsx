import AppointmentsDashboard from "@/components/admin/appointments-dashboard";
import { getAppointments } from "@/lib/actions";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const appointments = await getAppointments();
  
    return (
    <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Painel de Agendamentos</h1>
            <AppointmentsDashboard appointments={appointments} />
        </div>
    </div>
  );
}
