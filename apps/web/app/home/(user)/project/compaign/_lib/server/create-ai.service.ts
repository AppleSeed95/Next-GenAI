import { OpenAI } from 'openai';

const DEFAULT_MODEL = process.env.OPENAI_MODEL_NAME as string;
const SYSTEM = 'system' as const;
const USER = "user" as const;

/**
 * Creates an instance of AiEditorService.
 * @throws {Error} If OPENAI_API_KEY is missing.
 * @return {AiEditorService} An instance of AiEditorService.
 */
export default function createAiEditorService(): AiEditorService {
  const API_KEY = process.env.OPENAI_API_KEY;
  const BASE_URL = process.env.OPENAI_BASE_URL;

  const client = new OpenAI({ apiKey: API_KEY });
  console.log("Client: ", client);

  return new AiEditorService(client);
}

/**
 * A class that provides AI text editing services using the OpenAI client.
 */
class AiEditorService {
  constructor(private readonly client: OpenAI) { }

  /**
   * Generates a complete Content based on the provided context.
   *
   * @param {object} params - The parameters for generating the complete Content.
   * @param {string} params.context - The context to be used for generating the Content.
   * @return {Promise<object>} A promise that resolves to an object representing the generated Content.
   */
  async completeContent(params: { context: string, title: string, words: number, lang: string }) {

    const prompt = [
      {
        "role": SYSTEM,
        "content": `You are assisting USER in writing professional text. Never use double quotes.`,
      },
      {
        "role": USER,
        "content": `
        You have to generate title about "${params.title}" in one sentence and don't write "Title" word
        You have to generate title in "${params.lang}".
      `.trim(),
      },
      {
        "role": USER,
        "content": `
        You have to generate text about "${params.title}" and don't write "Content" word
        USER has provided the following text: "${params.context}"
        You have to write Content with ${params.words} sentences.
        You have to creat text in "${params.lang}".
        Your job is to complete the Content.
      `.trim(),
      },
    ];

    const GPT_response = await this.client.chat.completions.create({
      // model: DEFAULT_MODEL,
      model: "gpt-4-turbo",
      messages: prompt,
      // baseURL: "https://api.openai.com/v1/assistants",
      // max_tokens: 50,
      temperature: 0.8,
      // stream: true,
      top_p: 1,
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
