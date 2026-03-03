'use client';

import AppointmentsDashboard from "@/components/admin/appointments-dashboard";

export default function AdminPage() {
  return (
    <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Painel de Agendamentos</h1>
            <AppointmentsDashboard />
        </div>
    </div>
  );
}
