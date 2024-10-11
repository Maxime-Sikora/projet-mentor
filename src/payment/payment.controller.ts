import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './interface/create-payement.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private payementService: PaymentService) {}
  @Post()
  createPayment(@Body() { paymentMethod }: CreatePaymentDto) {
    return this.payementService.createPayment(paymentMethod);
  }

  @Get(':id')
  capturePayment(@Param('id') paymentIntentId) {
    return this.payementService.capturePayment(paymentIntentId);
  }
}
