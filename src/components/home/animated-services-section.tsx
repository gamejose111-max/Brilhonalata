'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '@/lib/data';
import { Car } from 'lucide-react';

export default function AnimatedServicesSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  });

  const carY = useTransform(scrollYProgress, [0, 1], ['0%', 'calc(100% - 64px)']);

  return (
    <section className="py-12 md:py-24 bg-card">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nosso Processo de Excelência
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Acompanhe o passo a passo de como transformamos o seu carro, garantindo um resultado impecável em cada etapa do nosso cuidado detalhado.
          </p>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-4xl">
            <div className="absolute left-8 top-8 h-[calc(100%-64px)] w-0.5 bg-border/40"></div>
            
            <motion.div style={{ y: carY }} className="absolute left-0 top-0 z-10 h-16 w-16 flex items-center justify-center">
                <Car className="w-12 h-12 text-primary drop-shadow-lg" />
            </motion.div>

            <div className="ml-24 space-y-40">
            {services.map((service, index) => (
              <div key={service.id} className="relative min-h-[120px] flex items-center">
                <div className="absolute -left-[5.2rem] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-card"></div>
                <div>
                    <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground max-w-md">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
