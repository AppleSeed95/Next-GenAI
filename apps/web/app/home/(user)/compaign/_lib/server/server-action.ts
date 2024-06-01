'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { CreateAIImageSchema, CreateAITextSchema, CreateAIVideoSchema } from '../schema/create-ai.schema';
import { getLogger } from '@kit/shared/logger';
import createAiEditorService from './create-ai.service';


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
