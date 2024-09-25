/**
 * This is a sample billing configuration file. You should copy this file to `billing.config.ts` and then replace
 * the configuration with your own billing provider and products.
 */
import { BillingProviderSchema, createBillingSchema } from '@kit/billing';

// The billing provider to use. This should be set in the environment variables
// and should match the provider in the database. We also add it here so we can validate
// your configuration against the selected provider at build time.
const provider = BillingProviderSchema.parse(
  process.env.NEXT_PUBLIC_BILLING_PROVIDER,
);

export default createBillingSchema({
  // also update config.billing_provider in the DB to match the selected
  provider,
  // products configuration
  products: [
    {
      id: 'free',
      name: 'Free',
      description: 'The perfect plan to get started',
      currency: 'EUR',
      badge: `Value`,
      plans: [
        {
          name: 'Starter Monthly',
          id: 'starter-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'price_1NNwYHI1i3VnbZTqI2UzaHIe',
              name: 'Addon 2',
              cost: 0,
              type: 'flat' as const,
            },
          ],
        },
        {
          name: 'Starter Yearly',
          id: 'starter-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'starter-yearly',
              name: 'Base',
              cost: 0.0,
              type: 'flat' as const,
            },
          ],
        },
      ],
      features: ['One channel', 'One compaign', '1 text + 1 image'],
    },
    {
      id: 'basic',
      name: 'Basic',
      badge: `Popular`,
      highlighted: true,
      description: 'The perfect plan for basic',
      currency: 'EUR',
      plans: [
        {
          name: 'Basic Monthly',
          id: 'basic-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'price_1Q0x6tI0GY3o5wRxlHaGUkX6',
              name: 'Base',
              cost: 9.9,
              type: 'flat',
            },
          ],
        },
        {
          name: 'Baisc Yearly',
          id: 'pro-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'price_basic_yearly',
              name: 'Base',
              cost: 115.0,
              type: 'flat',
            },
          ],
        },
      ],
      features: ['Everything', '3 compaign', 'only 2x per week'],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'The perfect plan for premium',
      currency: 'EUR',
      plans: [
        {
          name: 'Premium Monthly',
          id: 'premium-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'premium-premium-monthly',
              name: 'Premium',
              cost: 29.9,
              type: 'flat',
            },
          ],
        },
        {
          name: 'Premium Yearly',
          id: 'premium-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'price_enterprise_yearly',
              name: 'Base',
              cost: 350.0,
              type: 'flat',
            },
          ],
        },
      ],
      features: ['Everything', '10 compaign'],
    },
  ],
});
