import { enhanceRouteHandler } from '@kit/next/routes';

/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export const POST = enhanceRouteHandler(
  async ({ request }) => {

    try {
      // handle the webhook event
        const {url} = await request.json();
        const response = await fetch(url);
        console.log("Response :", response)
        if (!response.ok) throw new Error('Failed to fetch the image');
        const buffer = await response.arrayBuffer();
        console.log("Buffer : ", buffer)
      // return a successful response
      return new Response(buffer, { status: 200 });
    } catch (error) {
      // return an error response
      return new Response(null, { status: 500 });
    }
  },
  {
    auth: false,
  },
);
