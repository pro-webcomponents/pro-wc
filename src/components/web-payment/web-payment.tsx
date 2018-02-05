import { Component, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'pro-web-payment',
  styleUrl: 'web-payment.scss'
})
export class WebPayment {

  // The request
  @State() request: any;

  // Required payment method data
  @Prop() methodData: any = [{
      supportedMethods: ['visa', 'mastercard']
  }];

  // Required information about transaction
  @Prop() details: any;

  // Optional parameter for things like shipping, etc
  @Prop() options: any = {};

  // Callback function to execute after payment
  @Prop() callback: any;

  // Button Label
  @Prop() buttonLabel = 'Pay';

  pay() {
    if ('PaymentRequest' in window) {
      if (this.details) {
        this.request = new PaymentRequest(
          this.methodData,
          this.details,
          this.options
        );

        this.show(this.callback);
      } else {
        console.error('Not provided the details of the transaction');
      }
    } else {
        console.log('Payment Request API not supported');
    }
  }

  show(cb: any) {
    this.request.show()
    .then(function(paymentResponse: PaymentResponse) {
      cb && cb();
      paymentResponse.complete('success');
    }).catch(function(err: Error) {
      console.error(err.message);
    });
  }

  @Method()
  abort(ok: any) {
    if (this.request)
      this.request.abort()
      .then(ok)
      .catch(function(err: Error) {
        console.error(err.message);
      });
  }

  render() {
    return (
      <div>
        <button type='button' onClick={() => this.pay()}>
          <span>{ this.buttonLabel }</span>
        </button>
      </div>
    );
  }
}
