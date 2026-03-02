'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { services } from '@/lib/data';
import { Car } from 'lucide-react';

export default function AnimatedServicesSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  // UseSpring suaviza o movimento do carro
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const carY = useTransform(smoothProgress, [0, 1], ['0%', 'calc(100% - 64px)']);

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950/50">
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            O Caminho da Perfeição
          </h2>
          <p className="text-lg text-muted-foreground">
            Desde a preparação meticulosa até o acabamento final em pintura e polimento. Acompanhe a transformação do seu veículo em Cascais.
          </p>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-4xl min-h-[1200px]">
          {/* Linha Vertical da Time-line */}
          <div className="absolute left-8 top-8 h-[calc(100%-64px)] w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 rounded-full"></div>
          
          {/* Carro Animado */}
          <motion.div 
            style={{ y: carY }} 
            className="absolute left-0 top-0 z-20 h-16 w-16 flex items-center justify-center bg-background dark:bg-slate-900 rounded-full shadow-2xl border-2 border-primary"
          >
            <Car className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Etapas do Serviço */}
          <div className="ml-24 space-y-48">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center group"
              >
                {/* Ponto de Referência na Linha */}
                <div className="absolute -left-[72px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background border-4 border-primary shadow-sm group-hover:scale-125 transition-transform"></div>
                
                <div className="p-6 rounded-2xl bg-background/50 dark:bg-slate-900/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <service.Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
