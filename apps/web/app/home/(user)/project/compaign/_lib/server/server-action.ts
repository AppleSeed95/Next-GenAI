'use server';

import { OpenAIStream, StreamingTextResponse } from 'ai';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { CreateAITextSchema } from '../schema/create-ai.schema';
import { getLogger } from '@kit/shared/logger';
import { z } from 'zod';
import createAiEditorService from './create-ai.service';


/**
 * @name createAITextAction
 * @description Creates a AI for a personal account.
 */
export const createAITextAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeContent({
            title: data.title,
            context: data.description,
            lang: data.lang,
            words: data.words,
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
