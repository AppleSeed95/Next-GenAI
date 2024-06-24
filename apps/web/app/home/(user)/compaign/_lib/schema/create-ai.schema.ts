import { z } from 'zod';

export const CreateAITextSchema = z
.object({
   brand: z.string(),
   description: z.string(),
   lang: z.string(),
   words: z.number(),
   maintopic: z.string(),
   subtopic: z.string(),
})

export const CreateAIImageSchema = z
.object({
   format: z.string(),
   description: z.string(),
   size: z.string(),
   amount: z.number(),
   maintopic: z.string(),
   subtopic: z.string(),
})

export const downloadImageSchema = z
.object({
   url: z.string(),
})

export const CreateAIVideoSchema = z
.object({
   format: z.string(),
   description: z.string(),
   length: z.number(),
   maintopic: z.string(),
   subtopic: z.string(),
})
