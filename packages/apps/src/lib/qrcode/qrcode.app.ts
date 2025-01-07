import { createApp } from '@lecca-io/toolkit';
import { generateQRCodeAction } from './actions/generate-qr-code.action';
import { trackSupplyChainAction } from './actions/track-supply-chain.action';
import { newSalesTrigger } from './triggers/new-sales.trigger';
import { stripeApiKey } from './connections/stripe-api-key.connection';

export const qrCode = createApp({
    id: 'qrcode',
    name: 'QRCode',
    description: 'Generate QR codes for sales and customer metadata with Stripe integration.',
    logoUrl: 'https://lecca-io.s3.us-ea',
    actions: [generateQRCodeAction, trackSupplyChainAction],
    triggers: [newSalesTrigger],
    connections: [stripeApiKey],
});