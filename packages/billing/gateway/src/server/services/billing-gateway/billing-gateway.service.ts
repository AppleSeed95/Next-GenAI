import 'server-only';

import { z } from 'zod';

import { BillingProviderSchema } from '@kit/billing';
import {
  CancelSubscriptionParamsSchema,
  CreateBillingCheckoutSchema,
  CreateBillingPortalSessionSchema,
  ReportBillingUsageSchema,
  RetrieveCheckoutSessionSchema,
  UpdateSubscriptionParamsSchema,
} from '@kit/billing/schema';

import { BillingGatewayFactoryService } from './billing-gateway-factory.service';

/**
 * @description The billing gateway service to interact with the billing provider of choice (e.g. Stripe)
 * @class BillingGatewayService
 * @param {BillingProvider} provider - The billing provider to use
 * @example
 *
 * const provider = 'stripe';
 * const billingGatewayService = new BillingGatewayService(provider);
 */
export class BillingGatewayService {
  constructor(
    private readonly provider: z.infer<typeof BillingProviderSchema>,
  ) {}

  /**
   * Creates a checkout session for billing.
   *
   * @param {CreateBillingCheckoutSchema} params - The parameters for creating the checkout session.
   *
   */
  async createCheckoutSession(
    params: z.infer<typeof CreateBillingCheckoutSchema>,
  ) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = CreateBillingCheckoutSchema.parse(params);

    return strategy.createCheckoutSession(payload);
  }

  /**
   * Retrieves the checkout session from the specified provider.
   *
   * @param {RetrieveCheckoutSessionSchema} params - The parameters to retrieve the checkout session.
   */
  async retrieveCheckoutSession(
    params: z.infer<typeof RetrieveCheckoutSessionSchema>,
  ) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = RetrieveCheckoutSessionSchema.parse(params);

    return strategy.retrieveCheckoutSession(payload);
  }

  /**
   * Creates a billing portal session for the specified parameters.
   *
   * @param {CreateBillingPortalSessionSchema} params - The parameters to create the billing portal session.
   */
  async createBillingPortalSession(
    params: z.infer<typeof CreateBillingPortalSessionSchema>,
  ) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = CreateBillingPortalSessionSchema.parse(params);

    return strategy.createBillingPortalSession(payload);
  }

  /**
   * Cancels a subscription.
   *
   * @param {CancelSubscriptionParamsSchema} params - The parameters for cancelling the subscription.
   */
  async cancelSubscription(
    params: z.infer<typeof CancelSubscriptionParamsSchema>,
  ) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = CancelSubscriptionParamsSchema.parse(params);

    return strategy.cancelSubscription(payload);
  }

  /**
   * Reports the usage of the billing.
   * @description This is used to report the usage of the billing to the provider.
   * @param params
   */
  async reportUsage(params: z.infer<typeof ReportBillingUsageSchema>) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = ReportBillingUsageSchema.parse(params);

    return strategy.reportUsage(payload);
  }

  /**
   * Updates a subscription with the specified parameters.
   * @param params
   */
  async updateSubscriptionItem(
    params: z.infer<typeof UpdateSubscriptionParamsSchema>,
  ) {
    const strategy = await BillingGatewayFactoryService.GetProviderStrategy(
      this.provider,
    );

    const payload = UpdateSubscriptionParamsSchema.parse(params);

    return strategy.updateSubscription(payload);
  }
}
