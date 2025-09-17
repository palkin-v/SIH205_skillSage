'use server';
/**
 * @fileOverview Provides AI-driven insights into the job market for a specific role.
 *
 * - getJobMarketInsights - A function that returns insights for a given job title.
 * - GetJobMarketInsightsInput - The input type for the function.
 * - GetJobMarketInsightsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetJobMarketInsightsInputSchema = z.object({
  jobTitle: z.string().describe('The job title to get insights for. e.g., "Software Engineer"'),
});
export type GetJobMarketInsightsInput = z.infer<typeof GetJobMarketInsightsInputSchema>;


const GetJobMarketInsightsOutputSchema = z.object({
  averageSalary: z.string().describe("The estimated average salary range for this role in a major market like the US or Europe."),
  requiredSkills: z.array(z.string()).describe("A list of key skills and technologies required for this job."),
  futureOutlook: z.string().describe("A brief summary of the future outlook and demand for this role."),
});
export type GetJobMarketInsightsOutput = z.infer<typeof GetJobMarketInsightsOutputSchema>;

export async function getJobMarketInsights(
  input: GetJobMarketInsightsInput
): Promise<GetJobMarketInsightsOutput> {
  return getJobMarketInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getJobMarketInsightsPrompt',
  input: {schema: GetJobMarketInsightsInputSchema},
  output: {schema: GetJobMarketInsightsOutputSchema},
  prompt: `You are a career analyst AI. Your task is to provide a concise overview of the job market for a specific role.
  
Job Title: {{{jobTitle}}}

Provide the following information based on current trends in major markets (e.g., US, Europe):
1.  **Average Salary:** A realistic estimated salary range (e.g., "$100,000 - $140,000 USD").
2.  **Required Skills:** A list of the top 5-7 most important technical and soft skills.
3.  **Future Outlook:** A brief, 2-3 sentence summary of the demand and future prospects for this career path.
`,
});

const getJobMarketInsightsFlow = ai.defineFlow(
  {
    name: 'getJobMarketInsightsFlow',
    inputSchema: GetJobMarketInsightsInputSchema,
    outputSchema: GetJobMarketInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
