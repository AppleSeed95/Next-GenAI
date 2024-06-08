'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { CreateAIImageSchema, CreateAITextSchema, CreateAIVideoSchema } from '../schema/create-ai.schema';
import { getLogger } from '@kit/shared/logger';
import createAiEditorService from './create-ai.service';
import { SaveProjectSchema } from '../schema/save-project.schema';
import { requireUser } from '@kit/supabase/require-user';
import { z } from 'zod';
import { redirect } from 'next/dist/server/api-utils';
import { revalidatePath } from 'next/cache';


/**
 * @name createAITextAction
 * @description Creates a AI for a personal account.
 */
export const createAITextAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeTextContent({
            brand: data.brand,
            context: data.description,
            lang: data.lang,
            words: data.words,
            maintopic: data.maintopic,
            subtopic: data.subtopic,
         });

         // const stream = OpenAIStream(response);
         // return new StreamingTextResponse(stream);
         return response;

      } catch (e) {
         console.log("Bug: ", e);
         // return NextResponse.error();
         return ("Error");
      }
   },
   {
      schema: CreateAITextSchema,
   }
);

export const createAIImageAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeImageContent({
            format: data.format,
            context: data.description,
            scale: data.scale,
            amount: data.amount,
         });

         // const stream = OpenAIStream(response);
         // return new StreamingTextResponse(stream);
         return response;

      } catch (e) {
         console.log("Bug: ", e);
         // return NextResponse.error();
         return ("Error");
      }
   },
   {
      schema: CreateAIImageSchema,
   }
);

export const createAIVideoAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeVideoContent({
            format: data.format,
            context: data.description,
            length: data.length,
         });

         // const stream = OpenAIStream(response);
         // return new StreamingTextResponse(stream);
         return response;

      } catch (e) {
         console.log("Bug: ", e);
         // return NextResponse.error();
         return ("Error");
      }
   },
   {
      schema: CreateAIVideoSchema,
   }
);

/**
 * @name saveProject
 * @description Creates a AI for a personal account.
 */
// export async function saveProjectAction(params: z.infer<typeof SaveProjectSchema>) {
//    'use server';

//    const saveData = SaveProjectSchema.parse(params);

//    const logger = await getLogger();
//    const client = getSupabaseServerActionClient();
//    const auth = await requireUser(client);

//    if (!auth.data) {
//       //   redirect(auth.redirectTo);
//    }

//    logger.info(saveData, `Adding saveData...`);

//    const { data, error } = await client.from('project_table')
//       .insert({ ...saveData, account_id: params.account_id });

//    if (error) {
//       logger.error(error, `Failed to save Content`);
//       console.log(error);

//       throw new Error(`Failed to save Content`);
//    }

//    logger.info(data, `Content saved successfully`);

//    revalidatePath('/home', 'page');

//    return null;
// }


export const saveProjectAction = enhanceAction(
   async function (params) {
      const saveData = SaveProjectSchema.parse(params);

      const logger = await getLogger();
      const client = getSupabaseServerActionClient();
      const auth = await requireUser(client);

      if (!auth.data) {
         //   redirect(auth.redirectTo);
      }

      logger.info(params, `Adding saveData...` );
      logger.info(saveData, `Adding saveData...`);

      const { data, error } = await client.from('project_table')
         .insert({ ...saveData, account_id: params.account_id });

      if (error) {
         logger.error(error, `Failed to save Content`);
         console.log(error);

         throw new Error(`Failed to save Content`);
      }

      revalidatePath('/home/project', 'page');
      logger.info(data, `Content saved successfully`);


      return null;
   },
   {
      schema: SaveProjectSchema,
   }
);
