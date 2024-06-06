'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { CreateAIImageSchema, CreateAITextSchema, CreateAIVideoSchema } from '../schema/create-ai.schema';
import { getLogger } from '@kit/shared/logger';
import createAiEditorService from './create-ai.service';
import { SaveProject } from '../schema/save-project.schema';
import { requireUser } from '@kit/supabase/require-user';
import { redirect } from 'next/dist/server/api-utils';


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
export const saveProject = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient()
      const logger = await getLogger();
      const auth = requireUser(client);
      const saveData = SaveProject.parse(data);

      if (!(await auth).data) {
         // redirect(auth.redirectTo)
      }

      logger.info(saveData, `Adding task...`);

      
   },
   {
      schema: SaveProject,
   }
);
