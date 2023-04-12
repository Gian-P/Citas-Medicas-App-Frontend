import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public paymentIntent(pago: any): Observable<any> {
    return this.http.post(this.myAppUrl + 'payment-intent', pago).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError("Error al obtener el intento de pago");
      })
    );
  }

  public confirmPayment(id: string, idPago: number): Observable<any> {
    const paymentIntentRequest = {
      amount: 50,
      currency: 'USD',
      description: 'Cita médica',
    }

    return this.http.post(this.myAppUrl + 'confirm/' + id + '/' + idPago, paymentIntentRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError("Error al confirmar el pago");
      })
    );
  }

  public cancelPayment(id: string, idPago: number, idCita: number): Observable<any> {
    return this.http
      .post(
        this.myAppUrl + 'cancel/' + id + '/' + idPago + '/' + idCita,
        undefined
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError('Error al cancelar el pago');
        })
      );
  }
}
