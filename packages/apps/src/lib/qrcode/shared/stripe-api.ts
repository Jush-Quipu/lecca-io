import Stripe from 'stripe';

export const sharedStripe = {
    /**
     * Creates and returns a Stripe client instance.
     * 
     * @param {string} apiKey - Your Stripe API key.
     * @returns {Stripe} Stripe client instance.
     * @throws {Error} Throws an error if the API key is invalid or missing.
     */
    createClient: (apiKey: string) => {
        if (!apiKey || !apiKey.startsWith('sk_')) {
            throw new Error(
                'Invalid Stripe API key. Ensure the key starts with "sk_" and is correctly configured.'
            );
        }
        return new Stripe(apiKey, { apiVersion: '2022-11-15' });
    },
};