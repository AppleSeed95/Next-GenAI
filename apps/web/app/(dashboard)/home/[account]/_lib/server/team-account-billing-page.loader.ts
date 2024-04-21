import 'server-only';

import { cache } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

import { z } from 'zod';

import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';

import { Database } from '~/lib/database.types';

/**
 * The variable BILLING_MODE represents the billing mode for a service. It can
 * have either the value 'subscription' or 'one-time'. If not provided, the default
 * value is 'subscription'. The value can be overridden by the environment variable
 * BILLING_MODE.
 *
 * If the value is 'subscription', we fetch the subscription data for the user.
 * If the value is 'one-time', we fetch the orders data for the user.
 * if none of these suits your needs, please override the below function.
 */
const BILLING_MODE = z
  .enum(['subscription', 'one-time'])
  .default('subscription')
  .parse(process.env.BILLING_MODE);

export const loadTeamAccountBillingPage = cache((accountId: string) => {
  const client = getSupabaseServerComponentClient();

  const data =
    BILLING_MODE === 'subscription'
      ? getSubscriptionData(client, accountId)
      : getOrdersData(client, accountId);

  const customerId = getBillingCustomerId(client, accountId);

  return Promise.all([data, customerId]);
});

/**
 * Get the subscription data for the given user.
 * @param client
 * @param accountId
 */
function getSubscriptionData(
  client: SupabaseClient<Database>,
  accountId: string,
) {
  return client
    .from('subscriptions')
    .select('*, items: subscription_items !inner (*)')
    .eq('account_id', accountId)
    .maybeSingle()
    .then((response) => {
      if (response.error) {
        throw response.error;
      }

      return response.data;
    });
}

/**
 * Get the orders data for the given user.
 * @param client
 * @param accountId
 */
function getOrdersData(client: SupabaseClient<Database>, accountId: string) {
  return client
    .from('orders')
    .select('*, items: order_items !inner (*)')
    .eq('account_id', accountId)
    .maybeSingle()
    .then((response) => {
      if (response.error) {
        throw response.error;
      }

      return response.data;
    });
}

/**
 * Get the billing customer ID for the given user.
 * If the user does not have a billing customer ID, it will return null.
 * @param client
 * @param accountId
 */
function getBillingCustomerId(
  client: SupabaseClient<Database>,
  accountId: string,
) {
  return client
    .from('billing_customers')
    .select('customer_id')
    .eq('account_id', accountId)
    .maybeSingle()
    .then((response) => {
      if (response.error) {
        throw response.error;
      }

      return response.data?.customer_id;
    });
}
