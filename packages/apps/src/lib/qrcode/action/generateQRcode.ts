import { createAction, createTextInputField, createJsonInputField } from '@lecca-io/toolkit';
import { z } from 'zod';

export const generateQRCodeAction = createAction({
    id: 'qr-code-app_action_generate-qr-code',
    name: 'Generate QR Code',
    description: 'Generate a QR code using Stripe payment data.',
    inputConfig: [
        createTextInputField({
            id: 'saleId',
            label: 'Sale ID',
            description: 'Unique identifier for the sale.',
            required: { missingMessage: 'Sale ID is required.', missingStatus: 'warning' },
        }),
        createJsonInputField({
            id: 'customerData',
            label: 'Customer Metadata',
            description: 'Customer metadata in JSON format.',
            placeholder: '{"name": "John Doe", "email": "john@example.com"}',
            required: { missingMessage: 'Customer metadata is required.', missingStatus: 'warning' },
        }),
        createTextInputField({
            id: 'qrStyle',
            label: 'QR Code Style (Optional)',
            description: 'Optional styling for the QR code (e.g., dark, light).',
            placeholder: 'e.g., dark',
        }),
    ],
    aiSchema: z.object({
        saleId: z.string().nonempty('Sale ID is required.'),
        customerData: z.string().nonempty('Customer data is required.'),
        qrStyle: z.string().optional(),
    }),
    run: async ({ configValue, connection }) => {
        const { saleId, customerData, qrStyle } = configValue;

        // Parse customer data with error handling
        let customer;
        try {
            customer = JSON.parse(customerData);
        } catch (error) {
            throw new Error('Invalid JSON format in customer data.');
        }

        // Ensure the connection has an API key
        if (!connection.apiKey) {
            throw new Error('API key is missing in the connection.');
        }

        // Prepare the QR code payload
        const qrCodePayload = {
            saleId,
            customer,
            qrStyle: qrStyle || 'default', // Fallback to default style
        };

        // Send a POST request to the QR code API
        const response = await fetch('https://your-qr-code-api.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${connection.apiKey}`,
            },
            body: JSON.stringify(qrCodePayload),
        });

        if (!response.ok) {
            throw new Error(`Failed to generate QR code: ${response.statusText}`);
        }

        // Parse and return the API response
        const { qrCodeUrl } = await response.json();
        return { qrCodeUrl };
    },
    mockRun: async () => ({
        qrCodeUrl: 'https://mock-qr-code-url.com/qr-code.png',
    }),
});