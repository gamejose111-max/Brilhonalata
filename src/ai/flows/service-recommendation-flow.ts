'use server';
/**
 * @fileOverview This file implements a Genkit flow for recommending automotive polishing and painting service packages.
 *
 * - recommendService - A function that handles the service recommendation process.
 * - ServiceRecommendationInput - The input type for the recommendService function.
 * - ServiceRecommendationOutput - The return type for the recommendService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ServiceRecommendationInputSchema = z.object({
  currentCondition: z
    .string()
    .describe(
      'A detailed description of the current condition of the vehicle, including any imperfections like scratches, dullness, or faded color.'
    ),
  desiredOutcome: z
    .string()
    .describe(
      'A detailed description of the desired outcome for the vehicle, such as removing swirl marks, restoring high gloss, or a full color change.'
    ),
});
export type ServiceRecommendationInput = z.infer<
  typeof ServiceRecommendationInputSchema
>;

const ServiceRecommendationOutputSchema = z.object({
  recommendedPackageName: z
    .string()
    .describe(
      'The name of the recommended service package (e.g., "Polimento Básico", "Restauração Completa de Pintura").'
    ),
  packageDescription: z
    .string()
    .describe(
      'A detailed description of what the recommended package includes and what it aims to achieve.'
    ),
  estimatedPriceRange: z
    .string()
    .describe(
      'An estimated price range for the recommended service package, in Euros (€, e.g., "€300 - €500").'
    ),
  reasoning: z
    .string()
    .describe(
      'A brief explanation of why this specific service package was recommended based on the provided condition and desired outcome.'
    ),
});
export type ServiceRecommendationOutput = z.infer<
  typeof ServiceRecommendationOutputSchema
>;

export async function recommendService(
  input: ServiceRecommendationInput
): Promise<ServiceRecommendationOutput> {
  return serviceRecommendationFlow(input);
}

const serviceRecommendationPrompt = ai.definePrompt({
  name: 'serviceRecommendationPrompt',
  input: {schema: ServiceRecommendationInputSchema},
  output: {schema: ServiceRecommendationOutputSchema},
  prompt: `You are an expert in car detailing, polishing, and painting services for 'Brilho na Lata'. Your task is to recommend the most suitable service package based on a customer's vehicle condition and desired outcome.

'Brilho na Lata' offers a range of services to meet various needs. Here are some examples of services you can recommend:
- Polimento Básico: Removes light swirl marks, enhances gloss.
- Polimento Técnico: Removes medium scratches, restores deep gloss, corrects paint imperfections.
- Cristalização de Pintura: Adds a protective layer for extra shine and minor scratch resistance.
- Vitrificação de Pintura: Advanced paint protection, superior gloss, and durability.
- Reparo de Pintura Localizado: Fixes small dents, scratches, and chips.
- Pintura Completa: Full car repaint.

Based on the following information, recommend ONE service package from 'Brilho na Lata'. Also, provide an estimated price range in Euros (€). Invent a plausible price range if specific prices are not provided to you.

Current Vehicle Condition: {{{currentCondition}}}
Desired Outcome: {{{desiredOutcome}}}`,
});

const serviceRecommendationFlow = ai.defineFlow(
  {
    name: 'serviceRecommendationFlow',
    inputSchema: ServiceRecommendationInputSchema,
    outputSchema: ServiceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await serviceRecommendationPrompt(input);
    return output!;
  }
);
