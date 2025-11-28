import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentController {
    async createPaymentIntent(req, res) {
        try {
            const { amount, currency, campaign_id } = req.body;

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                automatic_payment_methods: {
                    enabled: false,
                },
                payment_method_types: ["card"],

                metadata: {
                    campaign_id: 123
                }
            });

            res.json({
                clientSecret: paymentIntent.client_secret,
            });

        } catch (error) {
            console.error("Stripe error:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async verifyPayment(req, res) {
        const paymentIntentId = req.params.id;

        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status === 'succeeded') {
                res.json({
                    success: true,
                    message: 'Payment verified successfully.',
                    status: paymentIntent.status,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                });
            } else {
                res.json({ success: false, message: 'Payment not completed.' });
            }
        } catch (error) {
            console.error("Stripe error:", error);
            res.status(500).json({ error: error.message });
        }
    }

    handleStripeWebhook(req, res) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                req.headers['stripe-signature'],
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'payment_intent.succeeded') {
            const intent = event.data.object;

            const campaignId = intent.metadata.campaign_id;
            const amount = intent.amount_received;

            console.log(`PaymentIntent for campaign`, intent.metadata);
            // Your logic here:
            // publishCampaign(campaignId);
        }

        res.status(200).json({ received: true });
    }
}

export default new PaymentController();