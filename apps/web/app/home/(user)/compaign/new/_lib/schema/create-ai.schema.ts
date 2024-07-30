import { z } from 'zod';

export const SuggestPostTopicSchema = z
   .object({
      mainTopic: z.string(),
      subTopic: z.string(),
      atmosphere: z.string(),
      language: z.string(),

   })
export const generatePostContentSchema = z
   .object({
      topic: z.string(),
      wordsCnt: z.number(),
      language: z.string(),
      brand: z.string(),
      addition: z.string(),
   })
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
      // format: z.string(),
      // description: z.string(),
      // size: z.string(),
      // amount: z.number(),
      // topicIdea: z.string(),
      // maintopic: z.string(),
      // subtopic: z.string(),
      idea: z.string(),
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
