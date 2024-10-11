import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(private stripeService: StripeService) {}
  createPayment(paymentMethod: string) {
    this.stripeService.createPaymentIntent({
      amount: 1500,
      currency: 'eur',
      payment_method: paymentMethod, // a modifier dans postman avec les données de stripe pour faire des tests
      confirm: true, // pour les besoins de l'app car on a pas de frontend
      off_session: true, // pour les besoins de l'app car on a pas de frontend
      payment_method_options: {
        card: {
          capture_method: 'manual',
        },
      },
    });
  }

  capturePayment(paymentIntentId: string) {
    this.stripeService.capturePayement(paymentIntentId, {
      amount_to_capture: 1500,
    });
  }
}
