export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  description: string;
  idCita: number;
  idPaciente: number;
}

export interface PaymentIntentResponse {
  idPago: number;
  paymentIntent: PaymentIntent;
}

export interface PaymentIntent{
  id: string;
}

export interface PaymentSendData {
  idPaciente: number;
  idCita: number;
}
