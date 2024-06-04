import { z } from 'zod';


export const SaveProject = z
.object({
   id: z.number(),
   account_id: z.string(),
   project_name: z.string(),
   title: z.string(),
   platform: z.string(),
   topic: z.string(),
   subtopic: z.string(),
   state: z.boolean(),
   mode: z.string(),
   start_date: z.date(),
   end_date: z.date(),
   created_by: z.string(),
   updated_by: z.string()
})