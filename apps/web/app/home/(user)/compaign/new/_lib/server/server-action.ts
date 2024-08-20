'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';
import { getMailer } from '@kit/mailers';


import { SuggestPostTopicSchema, generatePostContentSchema, CreateAIImageSchema, CreateAITextSchema, CreateAIVideoSchema, downloadImageSchema } from '../schema/create-ai.schema';
import { getLogger } from '@kit/shared/logger';
import createAiEditorService from './create-ai.service';
import { SaveProjectSchema } from '../schema/save-project.schema';
import { requireUser } from '@kit/supabase/require-user';
import { revalidatePath } from 'next/cache';
import { SuggestTopicIdeaSchema } from '../schema/suggest-topic-ideas';
import { NextResponse } from 'next/server';


/**
 * @name createAITextAction
 * @description Creates a AI for a personal account.
 */



export async function sendEmail(params: {
   from: string;
   to: string;
}) {
   const mailer = await getMailer();
   try {

      const mailResult = await mailer.sendEmail({
         to: params.to,
         from: params.from,
         subject: 'Hello',
         text: 'Hello, World!'
      });
      console.log('this is mail result', mailResult);

      return { result: "mailResult" };
   }
   catch (e) {
      console.log("err", e);
      return { error: "e" };
   }

}



export const createAITextAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().suggestTextTopic(data);

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
      schema: SuggestPostTopicSchema,
   }
);
export const suggestPostTopicAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().suggestTextTopic(data);

         // const stream = OpenAIStream(response);
         // return new StreamingTextResponse(stream);
         return response as String;

      } catch (e) {
         console.log("Bug: ", e);
         // return NextResponse.error();
         return ("Error");
      }
   },
   {
      schema: SuggestPostTopicSchema,
   }
);
export const generatePostTextContentAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().generatePostTextContent(data);

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
      schema: generatePostContentSchema,
   }
);

export const createAIImageAction = enhanceAction(
   async function (data) {
      console.log(data);

      try {
         const response = await createAiEditorService().completeImageContent({
            idea: data.idea,
            ratio: data.ratio
         });
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

export const downloadImageAction = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeImageDownload({
            url: data.url,
         });
         console.log("Last server response :", response);
         return response;

      } catch (e) {
         console.log("Bug: ", e);
         return NextResponse.error();
         // return ("Error");
      }
   },
   {
      schema: downloadImageSchema,
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


export const saveProjectAction = enhanceAction(
   async function (params) {
      const saveData = SaveProjectSchema.parse(params);
      console.log('saving...', saveData);

      const logger = await getLogger();
      const client = getSupabaseServerActionClient();
      const auth = await requireUser(client);

      if (!auth.data) {
         //   redirect(auth.redirectTo);
      }

      logger.info(params, `Adding saveData...`);
      logger.info(saveData, `Adding saveData...`);

      const { data, error } = await client.from('campaign_table')
         .insert({ ...saveData, pUserId: params.pUserId });

      if (error) {
         logger.error(error, `Failed to save Content`);
         console.log(error);

         throw new Error(`Failed to save Content`);
      }

      revalidatePath('/home/project', 'page');
      logger.info(data, `Content saved successfully`);


      return true;
   },
   {
      schema: SaveProjectSchema,
   }
);

export const createSuggestTopic = enhanceAction(
   async function (data) {
      const client = getSupabaseServerActionClient();
      try {
         const response = await createAiEditorService().completeSuggestTopics({
            topic: data.topic,
            contentType: data.contentType,
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
      schema: SuggestTopicIdeaSchema
   }
);
