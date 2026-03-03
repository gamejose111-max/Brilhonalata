'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Sparkles, AlertCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  recommendService,
  type ServiceRecommendationOutput,
} from '@/ai/flows/service-recommendation-flow';

const formSchema = z.object({
  currentCondition: z
    .string()
    .min(10, 'Por favor, descreva a condição com mais detalhes.'),
  desiredOutcome: z
    .string()
    .min(10, 'Por favor, descreva o resultado desejado com mais detalhes.'),
});

export default function RecommendationSection() {
  const [recommendation, setRecommendation] =
    useState<ServiceRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentCondition: '',
      desiredOutcome: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendService(values);
      if (!result) throw new Error('No recommendation returned');
      setRecommendation(result);
    } catch (e) {
      setError('A Inteligência Artificial está a ser configurada ou a chave API está ausente. Pode continuar o agendamento manualmente ou contactar-nos pelo WhatsApp.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="recomendacao" className="py-12 md:py-24 bg-card">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Inteligência Artificial</span>
            </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Dúvidas sobre o Serviço?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Peça uma sugestão à nossa IA ou fale diretamente connosco em Cascais.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recomendação Inteligente</CardTitle>
              <CardDescription>
                Explique o estado da pintura e o que deseja alcançar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="currentCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado Atual</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Pintura sem brilho, com marcas de lavagem e arranhões leves..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desiredOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>O que deseja?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Quero um acabamento espelhado e proteção duradoura..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Bot className="mr-2 h-4 w-4" />
                    )}
                    Analisar Pedido
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center">
            {isLoading && (
              <Card className="flex w-full flex-col items-center justify-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">O mestre está a analisar o seu relato...</p>
              </Card>
            )}
            {error && (
              <div className="w-full space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>IA em Manutenção</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="default" className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="https://wa.me/351912345678" target="_blank">
                      <Phone className="mr-2 h-4 w-4" />
                      Falar pelo WhatsApp
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/agendar">
                      Ir para Agendamento Manual
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            {recommendation && (
              <Card className="w-full animate-fade-in border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Sugestão do Especialista
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">
                    {recommendation.recommendedPackageName}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong className="text-foreground">Processo:</strong><br />
                      <span className="text-muted-foreground">{recommendation.packageDescription}</span>
                    </p>
                    <p>
                      <strong className="text-foreground">Por que escolhemos este?</strong><br />
                      <span className="text-muted-foreground">{recommendation.reasoning}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="w-full rounded-lg bg-primary/10 p-4 text-center border border-primary/20">
                        <p className="text-sm font-semibold text-primary">Investimento Estimado</p>
                        <p className="text-2xl font-bold text-primary">{recommendation.estimatedPriceRange}</p>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/agendar">Reservar Este Serviço</Link>
                    </Button>
                </CardFooter>
              </Card>
            )}
            {!isLoading && !error && !recommendation && (
                <Card className="flex h-full w-full flex-col items-center justify-center p-8 border-dashed bg-slate-50/50 dark:bg-slate-900/20">
                    <div className="text-center text-muted-foreground">
                        <Bot className="mx-auto h-12 w-12 opacity-20" />
                        <p className="mt-4 max-w-[200px] text-sm italic">O mestre está pronto para aconselhar sobre a estética do seu carro.</p>
                    </div>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
