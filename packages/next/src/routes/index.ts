import 'server-only';

import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { User } from '@supabase/supabase-js';

import { z } from 'zod';

import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseRouteHandlerClient } from '@kit/supabase/route-handler-client';

import { zodParseFactory } from '../utils';

interface HandlerParams<Body> {
  request: NextRequest;
  user: User;
  body: Body;
}

/**
 * Enhanced route handler function.
 *
 * This function takes a request and parameters object as arguments and returns a route handler function.
 * The route handler function can be used to handle HTTP requests and apply additional enhancements
 * based on the provided parameters.
 *
 * Usage:
 * export const POST = enhanceRouteHandler(
 *   ({ request, body, user }) => {
 *     return new Response(`Hello, ${body.name}!`);
 *   },
 *   {
 *     schema: z.object({
 *       name: z.string(),
 *     }),
 *   },
 * );
 *
 */
export const enhanceRouteHandler = <
  Body,
  Schema extends z.ZodType<Body, z.ZodTypeDef>,
>(
  // Route handler function
  handler:
    | ((params: HandlerParams<z.infer<Schema>>) => NextResponse | Response)
    | ((
        params: HandlerParams<z.infer<Schema>>,
      ) => Promise<NextResponse | Response>),

  // Parameters object
  params?: {
    captcha?: boolean;
    schema?: Schema;
  },
) => {
  /**
   * Route handler function.
   *
   * This function takes a request object as an argument and returns a response object.
   */
  return async function routeHandler(request: NextRequest) {
    // Verify the captcha token if required
    if (params?.captcha) {
      const token = captchaTokenGetter(request);

      // If the captcha token is not provided, return a 400 response.
      if (token) {
        await verifyCaptchaToken(token);
      } else {
        return new Response('Captcha token is required', { status: 400 });
      }
    }

    const client = getSupabaseRouteHandlerClient();
    const auth = await requireUser(client);

    // If the user is not authenticated, redirect to the specified URL.
    if (auth.error) {
      return redirect(auth.redirectTo);
    }

    const user = auth.data;

    // clone the request to read the body
    // so that we can pass it to the handler safely
    let body = await request.clone().json();

    if (params?.schema) {
      body = zodParseFactory(params.schema)(body);
    }

    // all good, call the handler with the request, body and user
    return handler({ request, body, user });
  };
};

/**
 * Get the captcha token from the request headers.
 * @param request
 */
function captchaTokenGetter(request: NextRequest) {
  return request.headers.get('x-captcha-token');
}
