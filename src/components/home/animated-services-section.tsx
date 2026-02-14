'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '@/lib/data';

// A simple side-view car SVG icon.
const SideCarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M112,319.9a32.07,32.07,0,0,1,32,32,31.85,31.85,0,0,1-32,32,32,32,0,0,1-32-32,31.9,31.9,0,0,1,32-32m288,0a32.07,32.07,0,0,1,32,32,31.85,31.85,0,0,1-32,32,32,32,0,0,1-32-32,31.9,31.9,0,0,1,32-32M112,335.9c-8.8,0-16,7.2-16,16s7.2,16,16,16,16-7.2,16-16-7.2-16-16-16Zm288,0c-8.8,0-16,7.2-16,16s7.2,16,16,16,16-7.2,16-16-7.2-16-16-16ZM496,208a16,16,0,0,0-16,16v32H464a64.07,64.07,0,0,0-64-64H384V160a80.09,80.09,0,0,0-80-80H192a80.09,80.09,0,0,0-80,80v32H96a64.07,64.07,0,0,0-64,64H16v-32a16,16,0,0,0-32,0v96a16,16,0,0,0,32,0v-32h16a64.07,64.07,0,0,0,64,64H400.23a63.6,63.6,0,0,0,10.65.75,64,64,0,0,0,51-24.28L501,244.38a16,16,0,0,0-5-20.38ZM144,160a48.05,48.05,0,0,1,48-48h96a48.05,48.05,0,0,1,48,48v32H144Zm320,96H48v-16a32,32,0,0,1,32-32H400a32,32,0,0,1,32,32Zm-48,48H80a32,32,0,0,1-32-32V288H416v16a31.9,31.9,0,0,1-32,32Z"/>
    </svg>
  );

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
                <SideCarIcon className="w-12 h-12 text-primary drop-shadow-lg" />
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
