import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(
    private httpClient:HttpClient
  ) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const email: string = control.value;
    return this.httpClient.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
              .pipe(
                map( resp => {
                  return (resp.length === 0 )
                         ? null
                         : { emailTomado: true}
                } )
              );
  }
}