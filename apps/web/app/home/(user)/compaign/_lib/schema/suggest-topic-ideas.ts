import { z } from 'zod';


export const SuggestTopicIdeaSchema = z
.object({
   topic: z.string(),
   contentType: z.string(),
})