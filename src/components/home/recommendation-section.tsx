'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Sparkles } from 'lucide-react';

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
      setRecommendation(result);
    } catch (e) {
      setError('Ocorreu um erro ao buscar a recomendação. Tente novamente.');
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
            Não Sabe Qual Serviço Escolher?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Use nossa ferramenta inteligente para obter uma recomendação de serviço personalizada para o seu veículo.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Receba uma Recomendação</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para que nossa IA sugira o melhor serviço.
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
                        <FormLabel>Condição Atual do Veículo</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Pintura fosca, com arranhões leves e algumas manchas..."
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
                        <FormLabel>Resultado Desejado</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Quero restaurar o brilho, remover os arranhões e proteger a pintura..."
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
                    Obter Recomendação
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center">
            {isLoading && (
              <Card className="flex w-full flex-col items-center justify-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Analisando...</p>
              </Card>
            )}
            {error && (
              <Card className="flex w-full flex-col items-center justify-center p-8 text-destructive">
                <p>{error}</p>
              </Card>
            )}
            {recommendation && (
              <Card className="w-full animate-fade-in">
                <CardHeader>
                  <CardTitle>Pacote Recomendado</CardTitle>
                  <CardDescription>
                    Com base nas suas informações, esta é a nossa sugestão.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {recommendation.recommendedPackageName}
                  </h3>
                  <p>
                    <strong className="block">Descrição:</strong>{' '}
                    {recommendation.packageDescription}
                  </p>
                  <p>
                    <strong className="block">Motivo:</strong>{' '}
                    {recommendation.reasoning}
                  </p>
                </CardContent>
                <CardFooter>
                    <div className="w-full rounded-lg bg-primary/10 p-4 text-center">
                        <p className="font-semibold">Preço Estimado</p>
                        <p className="text-2xl font-bold text-primary">{recommendation.estimatedPriceRange}</p>
                    </div>
                </CardFooter>
              </Card>
            )}
            {!isLoading && !error && !recommendation && (
                <Card className="flex w-full flex-col items-center justify-center p-8 border-dashed">
                    <div className="text-center text-muted-foreground">
                        <Bot className="mx-auto h-12 w-12" />
                        <p className="mt-4">Sua recomendação aparecerá aqui.</p>
                    </div>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
