import { z } from 'zod';


export const DeleteProjectSchema = z
.object({
   id: z.number(),
})