import { createApiKeyConnection } from '@lecca-io/toolkit';

export const stripeApiKey = createApiKeyConnection({
    id: 'stripe_connection_api-key',
    name: 'Stripe API Key',
    description: 'Connect securely to Stripe using an API key.',
    inputConfig: {
        apiKey: {
            label: 'Stripe Secret Key',
            placeholder: 'sk_live_...',
            description: 'Enter your Stripe Secret Key (starts with "sk_"). This key is used to authenticate API requests to Stripe.',
            required: {
                missingMessage: 'Stripe Secret Key is required.',
                missingStatus: 'error',
            },
            validate: (key) => {
                // Example validation for Stripe keys
                if (!key.startsWith('sk_')) {
                    return {
                        valid: false,
                        message: 'The API key must start with "sk_".',
                    };
                }
                return { valid: true };
            },
        },
    },
});