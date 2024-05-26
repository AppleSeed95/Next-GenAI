import { z } from 'zod';

export const CreateAITextSchema = z
.object({
   title: z.string(),
   description: z.string(),
   lang: z.string(),
   words: z.number(),
})