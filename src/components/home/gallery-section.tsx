'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function GallerySection() {
  const galleryImage = PlaceHolderImages.find((img) => img.id === 'gallery-car');

  return (
    <section id="gallery" className="py-12 md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-last">
                 {galleryImage && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                        <Image
                            src={galleryImage.imageUrl}
                            alt={galleryImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={galleryImage.imageHint}
                        />
                    </div>
                )}
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Resultados que Falam por Si
                </h2>
                <p className="text-lg text-muted-foreground">
                    Cada carro que passa por nossas mãos recebe um tratamento de mestre, resultando em um brilho e acabamento impecáveis. Veja por si mesmo a qualidade do nosso trabalho em nossa galeria do Instagram.
                </p>
                <div className="pt-4">
                    <Button size="lg" asChild>
                        <Link href="https://www.instagram.com/brilho_na_lataa/" target="_blank" rel="noopener noreferrer">
                            Ver Galeria no Instagram
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
