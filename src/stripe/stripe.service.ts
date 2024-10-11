import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly webhookKey: string;
  constructor(private configService: ConfigService) {
    const stripeApiKey = this.configService.get('STRIPE_SECRET_KEY');
    const stripeWebHookKey = this.configService.get(
      'STRIPE_SECRET_WEBHOOK_KEY',
    );
    this.stripe = new Stripe(stripeApiKey);
    this.webhookKey = stripeWebHookKey;
  }
  public async createPaymentIntent(params: Stripe.PaymentIntentCreateParams) {
    return this.stripe.paymentIntents.create(params);
  }

  public async capturePayement(
    id: string,
    params?: Stripe.PaymentIntentCaptureParams,
  ) {
    return this.stripe.paymentIntents.capture(id, params);
  }

  public async handleIncomingEvents(signature: string, rawBody: Buffer) {
    const event = await this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      this.webhookKey,
    );
    switch (event.type) {
      case 'payment_intent.created':
        console.log('payment intent created');
        break;
      case 'payment_intent.succeeded':
        console.log('payement intent succeeded');
        break;
      case 'payment_intent.payment_failed':
        console.log('payement intent failed');
        break;
    }
    return true;
  }
}
