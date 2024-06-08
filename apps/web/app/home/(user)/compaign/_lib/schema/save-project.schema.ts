import { z } from 'zod';


export const SaveProjectSchema = z
.object({
   account_id: z.string().uuid(),
   project_name: z.string().min(1),
   title: z.string().min(1),
   platform: z.string(),
   topic: z.string(),
   subtopic: z.string().nullable(),
   state: z.boolean(),
   mode: z.string(),
   start_date: z.string(),
   end_date: z.string(),
   created_by: z.string().uuid(),
   updated_by: z.string().uuid().nullable(),
})