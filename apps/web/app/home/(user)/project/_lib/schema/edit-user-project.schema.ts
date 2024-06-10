import { z } from 'zod';


export const EditProjectSchema = z
.object({
   id: z.number(),
   projectName: z.string().nullable(),
   topic: z.string(),
})