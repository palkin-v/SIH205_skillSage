'use server';
/**
 * @fileOverview Generates personalized training pathways for learners based on their profile and career aspirations.
 *
 * - generatePersonalizedTrainingPathways - A function that generates personalized training pathways.
 * - GeneratePersonalizedTrainingPathwaysInput - The input type for the generatePersonalizedTrainingPathways function.
 * - GeneratePersonalizedTrainingPathwaysOutput - The return type for the generatePersonalizedTrainingPathways function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedTrainingPathwaysInputSchema = z.object({
  learnerProfile: z.object({
    academicBackground: z.string().describe('The learner\'s academic background.'),
    priorSkills: z.string().describe('The learner\'s prior skills.'),
    socioEconomicContext: z.string().describe('The learner\'s socio-economic context.'),
    learningPace: z.string().describe('The learner\'s learning pace.'),
    aspirations: z.string().describe('The learner\'s career aspirations.'),
  }).describe('The learner\'s profile.'),
  careerAspirations: z.string().describe('The learner\'s career aspirations.'),
});
export type GeneratePersonalizedTrainingPathwaysInput = z.infer<
  typeof GeneratePersonalizedTrainingPathwaysInputSchema
>;

const TrainingPathwaySchema = z.object({
  courses: z.array(z.string()).describe('A list of recommended courses.'),
  microCredentials: z.array(z.string()).describe('A list of recommended micro-credentials.'),
  certifications: z.array(z.string()).describe('A list of recommended certifications.'),
  onTheJobTraining: z.array(z.string()).describe('A list of recommended on-the-job training opportunities.'),
});

const GeneratePersonalizedTrainingPathwaysOutputSchema = z.object({
  trainingPathways: z.array(TrainingPathwaySchema).describe('A list of personalized training pathways.'),
  skillGaps: z.array(z.string()).describe('A list of skill gaps identified.'),
});

export type GeneratePersonalizedTrainingPathwaysOutput = z.infer<
  typeof GeneratePersonalizedTrainingPathwaysOutputSchema
>;

export async function generatePersonalizedTrainingPathways(
  input: GeneratePersonalizedTrainingPathwaysInput
): Promise<GeneratePersonalizedTrainingPathwaysOutput> {
  return generatePersonalizedTrainingPathwaysFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTrainingPathwaysPrompt',
  input: {schema: GeneratePersonalizedTrainingPathwaysInputSchema},
  output: {schema: GeneratePersonalizedTrainingPathwaysOutputSchema},
  prompt: `You are an AI career navigator and personalized skilling assistant. Generate personalized training pathways for the learner based on their profile and career aspirations.

Learner Profile:
Academic Background: {{{learnerProfile.academicBackground}}}
Prior Skills: {{{learnerProfile.priorSkills}}}
Socio-Economic Context: {{{learnerProfile.socioEconomicContext}}}
Learning Pace: {{{learnerProfile.learningPace}}}
Aspirations: {{{learnerProfile.aspirations}}}

Career Aspirations: {{{careerAspirations}}}

Consider the learner's profile and career aspirations to generate personalized training pathways that include courses, micro-credentials, certifications, and on-the-job training opportunities. Also, identify any skill gaps between the learner's current skills and the requirements for their desired career.

Output the training pathways and skill gaps in a JSON format.
`,
});

const generatePersonalizedTrainingPathwaysFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTrainingPathwaysFlow',
    inputSchema: GeneratePersonalizedTrainingPathwaysInputSchema,
    outputSchema: GeneratePersonalizedTrainingPathwaysOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
