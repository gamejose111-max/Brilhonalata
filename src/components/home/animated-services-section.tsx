'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '@/lib/data';
import { Car } from 'lucide-react';

export default function AnimatedServicesSection() {
  // Uma referência ao elemento container que rastrearemos para o progresso da rolagem.
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // O hook useScroll rastreia o progresso da rolagem do elemento alvo.
  // 'start center' significa que a animação começa quando o topo do container atinge o centro da viewport.
  // 'end end' significa que a animação termina quando a parte inferior do container atinge a parte inferior da viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  });

  // useTransform mapeia o scrollYProgress (um valor de 0 a 1) para uma posição 'y'.
  // O carro se moverá do topo ('0%') para o fundo ('calc(100% - 64px)') do container.
  // Os '64px' são a altura do container do carro, garantindo que ele pare no final.
  const carY = useTransform(scrollYProgress, [0, 1], ['0%', `calc(100% - 64px)`]);

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

        {/* Este é o container de rolagem que estamos rastreando */}
        <div ref={containerRef} className="relative mx-auto max-w-4xl">
            {/* A barra de linha do tempo vertical. Sua altura é baseada neste container. */}
            <div className="absolute left-8 top-8 h-[calc(100%-64px)] w-0.5 bg-border/40"></div>
            
            {/* O ícone do carro animado. Aplicamos o estilo 'y' transformado aqui. */}
            <motion.div 
              style={{ y: carY }} 
              className="absolute left-0 top-0 z-10 h-16 w-16 flex items-center justify-center"
            >
                <Car className="w-12 h-12 text-primary drop-shadow-lg" />
            </motion.div>

            {/* A lista de serviços. A margem à esquerda cria espaço para a linha do tempo e o carro. */}
            <div className="ml-24 space-y-40">
            {services.map((service) => (
              <div key={service.id} className="relative flex min-h-[120px] items-center">
                {/* O ponto na linha do tempo. Corrigi sua posição horizontal. */}
                <div className="absolute -left-18 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary ring-4 ring-card"></div>
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
