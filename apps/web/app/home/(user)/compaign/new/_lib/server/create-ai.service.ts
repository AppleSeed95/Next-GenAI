import { NextResponse } from 'next/server';

import { OpenAI } from 'openai';

const DEFAULT_MODEL = process.env.OPENAI_MODEL_NAME as string;
const SYSTEM = 'system' as const;
const USER = 'user' as const;

/**
 * Creates an instance of AiEditorService.
 * @throws {Error} If OPENAI_API_KEY is missing.
 * @return {AiEditorService} An instance of AiEditorService.
 */
export default function createAiEditorService(): AiEditorService {
  const API_KEY = process.env.OPENAI_API_KEY;
  const BASE_URL = process.env.OPENAI_BASE_URL;

  const client = new OpenAI({ apiKey: API_KEY });

  return new AiEditorService(client);
}

/**
 * A class that provides AI text editing services using the OpenAI client.
 */
class AiEditorService {
  constructor(private readonly client: OpenAI) {}

  /**
   * Generates a complete Content based on the provided context.
   *
   * @param {object} params - The parameters for generating the complete Content.
   * @param {string} params.context - The context to be used for generating the Content.
   * @return {Promise<object>} A promise that resolves to an object representing the generated Content.
   */
  async completeTextContent(params: {
    context: string;
    brand: string;
    words: number;
    lang: string;
    maintopic: string;
    subtopic: string;
  }) {
    const prompt = [
      {
        role: SYSTEM,
        content: `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      {
        role: USER,

        content: `
          
        Generate a content title and text based on the provided parameters:
        - Main Topic: "${params.maintopic}"
        - Subtopic: "${params.subtopic}"
        - Brand: "${params.brand}"
        - Language: "${params.lang}"
        
          Requirements:
          Each sentence should not exceed 20 words.
          
           - Compose a title of 4 to 10 impactful words related to the main topic, subtopic, and brand.
           - Avoid using the word "Title."
           - Ensure the title is in the specified language, "${params.lang}".
           - you have to don't use "Title" word
        
         
           - Develop a text discussing the main topic, subtopic, and brand.
           - Background Information for context: "${-params.context}"
           - The text should be composed in "${params.lang}" and consist of exactly ${params.words} sentences.         
      
        `.trim(),
      },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: 'gpt-4-turbo',
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      // top_p: 1,
    });

    // for await (const chunk of GPT_response) {
    //   console.log(chunk.choices[0]?.delta.content); // this code from the doc runs
    // }

    return GPT_response.choices[0]?.message.content;
  }
  async suggestTextTopic(projectValue: {
    mainTopic: string;
    subTopic: string;
    atmosphere: string;
    language: string;
  }) {
    const generateAtmosphere = (array: string[]): string => {
      let result = '';
      array.forEach((a) => {
        result += a + ',';
      });
      return result;
    };
    const prompt = [
      {
        role: SYSTEM,
        content: `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      {
        role: USER,

        content: `
          
        Generate 3 topics seperated with '|' based on the provided parameters:
        - Main Topic: "${projectValue.mainTopic}"
        - Subtopic: "${projectValue.subTopic}"
        - Language: "${projectValue.language}"
        - Atmosphere: "${generateAtmosphere(JSON.parse(projectValue.atmosphere))}"
        
          Requirements:
          Each sentence should not exceed 20 words.
           - each topic should not contain any commas.
           - Do not provide number-ordered topics, I need '|'-seperated results.
           - Compose a title of 4 to 10 impactful words related to the main topic, subtopic, and Atmosphere.
           - Avoid using the word "Title."
           - Ensure the title is in the specified language, "${projectValue.language}".
           - you have to don't use "Title" word
        `.trim(),
      },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: 'gpt-4-turbo',
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      // top_p: 1,
    });

    // for await (const chunk of GPT_response) {
    //   console.log(chunk.choices[0]?.delta.content); // this code from the doc runs
    // }

    return GPT_response.choices[0]?.message.content;
  }
  async generatePostTextContent(data: {
    topic: string;
    language: string;
    wordsCnt: number;
    brand: string;
    addition: string;
  }) {
    const prompt = [
      {
        role: SYSTEM,
        content: `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      {
        role: USER,

        content: `
          
        Generate contents based on the current topic:${data.topic}:
        
          Requirements:
          
           - provide with about ${data.wordsCnt} words.
           - provide with this brand: ${data.brand}.
           - consider this additional information and reflect in the result: ${data.addition}.
           - provide with this language: ${data.language}.
           - never use bullet style. you should use plain text style.

        `.trim(),
      },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: 'gpt-4-turbo',
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      // top_p: 1,
    });

    // for await (const chunk of GPT_response) {
    //   console.log(chunk.choices[0]?.delta.content); // this code from the doc runs
    // }

    return GPT_response.choices[0]?.message.content;
  }

  /**
   * Generates a complete Suggest Topic Ideas.
   *
   * @param {object} params - The parameters for generating the complete Content.
   * @param {string} params.context - The context to be used for generating the Content.
   * @return {Promise<object>} A promise that resolves to an object representing the generated Content.
   */
  async completeSuggestTopics(params: { topic: string; contentType: string }) {
    const prompt = [
      {
        role: SYSTEM,
        content: `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      {
        role: USER,

        content: `        
          Create 5 topic ideas for a "${params.topic}" with a "${params.contentType}" approach, each described in 5 sentences.
        `.trim(),
      },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: 'gpt-4-turbo',
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      // top_p: 1,
    });

    // for await (const chunk of GPT_response) {
    //   console.log(chunk.choices[0]?.delta.content); // this code from the doc runs
    // }

    return GPT_response.choices[0]?.message.content;
  }

  /**
   * Generates a complete Content based on the provided context.
   *
   * @param {object} params - The parameters for generating the complete Content.
   * @param {string} params.context - The context to be used for generating the Content.
   * @return {Promise<object>} A promise that resolves to an object representing the generated Content.
   */
  async completeImageContent(params: {
    idea: string;
    ratio: string;
    additionalInfo: string;
  }) {
    // const prompt = [
    //   {
    //     "role": SYSTEM,
    //     "content": "You are assisting USER in writing professional text. Never use double quotes."
    //   },
    //   {
    //     "role": USER,
    //     "content": `
    //       Generate a prompt for image generation using the DALL-E 3 model:
    //       - Topic idea: "${params.topicIdea}".
    //       - Language: English.

    //       Requirements:
    //       - The prompt should be compliant with OpenAI's safety guidelines.
    //       - Create a realistic, high-resolution, high-definition image.
    //       - The prompt should be rich and descriptive, spanning 3 to 5 sentences.
    //       - The resultant image should appear lifelike and detailed.
    //       - All text for the prompt must be in English.
    //     `.trim()
    //   },
    // ];

    // const GPT_response = await this.client.chat.completions.create({
    //   // model: DEFAULT_MODEL,
    //   model: "gpt-4-turbo",
    //   messages: prompt,
    //   // baseURL: "https://api.openai.com/v1/assistants",
    //   // max_tokens: 50,
    //   temperature: 0.8,
    //   // stream: true,
    //   // top_p: 1,
    // });

    const Image_response = await this.client.images.generate({
      // model: DEFAULT_MODEL,
      model: 'dall-e-3',
      prompt: `
        generate a realistic image representing that content: "${params.idea}".
        consider this additional information and reflect in the result image: ${params.additionalInfo}.
        Generate an image with a horizontal orientation while keeping the size.
        make sure an image keep the posture of the things way up.
      `,
      quality: 'standard',
      n: 1,
      size:
        params.ratio === 'square'
          ? '1024x1024'
          : params.ratio === 'horizontal'
            ? '1792x1024'
            : '1024x1792',
    });

    const image_urls = Image_response.data.map((image) => image.url);

    return image_urls;
  }

  async completeImageDownload(params: { url: string }) {
    if (!params.url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 },
      );
    }

    try {
      const response = await fetch(params.url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const contentType = response.headers.get('content-type');
      const body = await response.arrayBuffer();

      return new NextResponse(body, {
        headers: {
          'Content-Type': contentType || 'application/octet-stream',
          'Content-Disposition': 'attachment; filename="image.png"',
        },
      });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  async saveProject(params: {
    format: string;
    context: string;
    scale: number;
    amount: number;
  }) {}

  /**
   * Generates a complete Content based on the provided context.
   *
   * @param {object} params - The parameters for generating the complete Content.
   * @param {string} params.context - The context to be used for generating the Content.
   * @return {Promise<object>} A promise that resolves to an object representing the generated Content.
   */
  async completeVideoContent(params: {
    format: string;
    context: string;
    length: number;
  }) {
    const prompt = [
      {
        role: SYSTEM,
        content: `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      // {

      //   "role": USER,

      //   "content": `

      //     Generate a video related to "${params.title}". The title should consist of 4 to 10 impactful words and don't use "Title" word. Ensure the title is in "${params.lang}" language.

      //     Develop a text discussing "${params.title}". Here's the background information provided by the user: "${params.context}". Compose the text in "${params.lang}" language, and ensure it contains exactly ${params.words} sentences.

      //   `.trim()

      // },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: 'gpt-4-turbo',
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      // top_p: 1,
    });

    // for await (const chunk of GPT_response) {
    //   console.log(chunk.choices[0]?.delta.content); // this code from the doc runs
    // }

    return GPT_response.choices[0]?.message.content;
  }

  /**
   * Rewrite the Content based on the given context.
   *
   * @param {Object} params - The parameters for rewriting the Content.
   * @param {string} params.context - The context of the Content to be rewritten.
   * @return {string} - The rewritten Content.
   */
  async rewriteContent(params: { context: string }) {
    const response = await this.client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: SYSTEM,
          content: `You are assisting USER in writing professional text. Never use double quotes.`,
        },
        {
          role: USER,
          content: `
          USER has provided the following text: "${params.context}"
          
          Your job is to rewrite the text to make it more readable, better structured, and more concise. Only provide the rewritten text.

          Text:
        `,
        },
      ],
      max_tokens: params.context.split(' ').length + 100,
      temperature: 0.8,
    });

    return this.getCompletionText(response);
  }

  /**
   * Corrects the grammar of the given text.
   *
   * @param {Object} params - The parameters object.
   * @param {string} params.context - The text to be corrected.
   * @return {string} - The corrected text.
   */
  async correctGrammar(params: { context: string }) {
    const response = await this.client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: SYSTEM,
          content: `You are assisting USER in writing professional text. Never use double quotes.`,
        },
        {
          role: USER,
          content: `
          USER has written the following text: "${params.context}"
          
          Your job is to correct the grammar of the text. Only provide the rewritten text.

          Text:
        `,
        },
      ],
      max_tokens: params.context.split(' ').length + 100,
      temperature: 0.8,
    });

    return this.getCompletionText(response);
  }

  /**
   * A method for generating a custom prompt for text completion.
   *
   * @param {Object} params - The parameters for generating the custom prompt.
   * @param {string} params.context - The context for the custom prompt.
   * @param {string} params.prompt - The prompt for the custom prompt.
   *
   * @return {string} - The generated completion text.
   */
  async customPromptEdit(params: { context: string; prompt: string }) {
    const messages = [
      {
        role: SYSTEM,
        content: `You are helpful writing assistant.`,
      },
      {
        role: USER,
        content: `
          Given the following context: "${params.context}"
          
          ${params.prompt}
        `,
      },
    ];

    const response = await this.client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages,
      max_tokens: params.context.split(' ').length + 100,
      temperature: 0.8,
    });

    return this.getCompletionText(response);
  }

  /**
   * Returns the completion text from the response object.
   * If the response object does not contain any choices, it returns an empty string.
   *
   * @param {Object} response - The response object from OpenAI.Chat.ChatCompletion API.
   *
   * @returns {string} The completion text.
   * @private
   */
  private getCompletionText(response: OpenAI.Chat.ChatCompletion) {
    return (response.choices ?? []).reduce((acc, choice) => {
      return acc + (choice.message.content ?? '');
    }, '');
  }
}
