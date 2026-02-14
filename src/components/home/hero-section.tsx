'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ServicesSection from './services-section';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-car');

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Restaure o Brilho do Seu Carro
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/90 md:text-xl">
            Serviços profissionais de polimento e pintura que trazem a vida de volta ao seu veículo.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/agendar">Agendar Agora</Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary">
                  Ver Serviços
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ServicesSection />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
