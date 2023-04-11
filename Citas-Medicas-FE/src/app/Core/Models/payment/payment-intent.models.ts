export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  description: string;
  idCita: number;
  idPaciente: number;
}

export interface PaymentIntentResponse {
  idPago: number;
  paymentId: string;
}

export interface PaymentSendData {
  idPaciente: number;
  idCita: number;
}
