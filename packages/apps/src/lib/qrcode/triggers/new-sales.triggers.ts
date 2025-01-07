import { createItemBasedPollTrigger, createTextInputField } from '@lecca-io/toolkit';
import { sharedStripe } from '../shared/stripe.shared';

export const newSalesTrigger = createItemBasedPollTrigger({
    id: 'qr-code-app_trigger_new-sales',
    name: 'New Sales from Stripe',
    description: 'Detect new successful sales from Stripe and populate customer data.',
    inputConfig: [
        createTextInputField({
            id: 'apiUrl',
            label: 'Stripe Endpoint',
            description: 'Stripe API endpoint for fetching new sales.',
            placeholder: 'https://api.stripe.com/v1/payment_intents',
            required: { missingMessage: 'API URL is required.', missingStatus: 'warning' },
        }),
    ],
    run: async ({ configValue, connection }) => {
        const { apiUrl } = configValue;

        // Create Stripe client using shared logic
        const stripe = sharedStripe.createClient(connection.apiKey);

        // Fetch the latest 10 payment intents from Stripe
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 10, // Adjust limit as needed
        });

        // Filter for successful sales
        const successfulSales = paymentIntents.data.filter((intent) => intent.status === 'succeeded');

        // Map results to the format expected by the trigger
        return successfulSales.map((sale) => ({
            id: sale.id, // Unique payment intent ID
            customerData: JSON.stringify(sale.metadata || {}), // Metadata populated as JSON
            timestamp: sale.created, // Timestamp when the payment was created
        }));
    },
    mockRun: async () => [
        {
            id: 'pi_mocked',
            customerData: '{"name":"John Doe","email":"john.doe@example.com"}',
            timestamp: '2025-01-01T12:00:00Z',
        },
    ],
    extractItemIdentifierFromResponse: (args) => args.response.id,
});