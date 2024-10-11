import { Module } from '@nestjs/common';
import { StripeModule } from 'src/stripe/stripe.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [StripeModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
