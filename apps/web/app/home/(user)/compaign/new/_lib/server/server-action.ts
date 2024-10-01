'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { getMailer } from '@kit/mailers';
import { enhanceAction } from '@kit/next/actions';
import { getLogger } from '@kit/shared/logger';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import {
  CreateAIImageSchema,
  CreateAIVideoSchema,
  SuggestPostTopicSchema,
  downloadImageSchema,
  generatePostContentSchema,
} from '../schema/create-ai.schema';
import { SaveProjectSchema } from '../schema/save-project.schema';
import { SuggestTopicIdeaSchema } from '../schema/suggest-topic-ideas';
import createAiEditorService from './create-ai.service';

/**
 * @name createAITextAction
 * @description Creates a AI for a personal account.
 */

export async function sendEmail(params: { from: string; to: string }) {
  const mailer = await getMailer();
  try {
    const mailResult = await mailer.sendEmail({
      to: params.to,
      from: params.from,
      subject: 'Hello',
      text: 'Hello, World!',
    });
    console.log(mailResult);

    return { result: 'mailResult' };
  } catch (e) {
    console.log(e);

    return { error: 'e' };
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
      // return NextResponse.error();
      return 'Error';
    }
  },
  {
    schema: SuggestPostTopicSchema,
  },
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
      // return NextResponse.error();
      return 'Error';
    }
  },
  {
    schema: SuggestPostTopicSchema,
  },
);
export const generatePostTextContentAction = enhanceAction(
  async function (data) {
    const client = getSupabaseServerActionClient();
    try {
      const response =
        await createAiEditorService().generatePostTextContent(data);

      // const stream = OpenAIStream(response);
      // return new StreamingTextResponse(stream);
      return response;
    } catch (e) {
      // return NextResponse.error();
      return 'Error';
    }
  },
  {
    schema: generatePostContentSchema,
  },
);

export const createAIImageAction = enhanceAction(
  async function (data) {
    try {
      const response = await createAiEditorService().completeImageContent({
        idea: data.idea,
        ratio: data.ratio,
        additionalInfo: data.additionalInfo,
      });
      return response;
    } catch (e) {
      // return NextResponse.error();
      return 'Error';
    }
  },
  {
    schema: CreateAIImageSchema,
  },
);

export const downloadImageAction = enhanceAction(
  async function (data) {
    const client = getSupabaseServerActionClient();
    try {
      const response = await createAiEditorService().completeImageDownload({
        url: data.url,
      });
      return response;
    } catch (e) {
      return NextResponse.error();
    }
  },
  {
    schema: downloadImageSchema,
  },
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
      return 'Error';
    }
  },
  {
    schema: CreateAIVideoSchema,
  },
);

/**
 * @name saveProject
 * @description Creates a AI for a personal account.
 */

export const saveProjectAction = enhanceAction(
  async function (params) {
    const saveData = SaveProjectSchema.parse(params);

    const logger = await getLogger();
    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);

    if (!auth.data) {
      //   redirect(auth.redirectTo);
    }

    logger.info(params, `Adding saveData...`);
    logger.info(saveData, `Adding saveData...`);

    const { data, error } = await client
      .from('campaign_table')
      .insert({ ...saveData, pUserId: params.pUserId });

    if (error) {
      logger.error(error, `Failed to save Content`);

      throw new Error(`Failed to save Content`);
    }

    revalidatePath('/home/project', 'page');
    logger.info(data, `Content saved successfully`);

    return redirect('/home/project');
  },
  {
    schema: SaveProjectSchema,
  },
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
      // return NextResponse.error();
      return 'Error';
    }
  },
  {
    schema: SuggestTopicIdeaSchema,
  },
);
