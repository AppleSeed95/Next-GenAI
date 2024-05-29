import { z } from 'zod';

export const CreateAITextSchema = z
.object({
   title: z.string(),
   description: z.string(),
   lang: z.string(),
   words: z.number(),
})

export const CreateAIImageSchema = z
.object({
   format: z.string(),
   description: z.string(),
   scale: z.number(),
   amount: z.number(),
})

export const CreateAIVideoSchema = z
.object({
   format: z.string(),
   description: z.string(),
   length: z.number(),
})