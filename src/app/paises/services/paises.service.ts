import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisSmall, Pais } from '../interfaces/paises.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
    private httpClient:HttpClient
  ) { }

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  private _baseUrl:string = 'https://restcountries.com/v2';


  get regiones(): string[] {
    return [...this._regiones];
  }

  getPaisesPorRegion( region:string ):Observable<PaisSmall[]> {
    const url:string = `${ this._baseUrl }/region/${ region }?fields=name,alpha3Code`;
    return this.httpClient.get<PaisSmall[]>( url );
  }

  getPaisPorCodigo( codigo:string ):Observable<Pais | null> {

    if ( !codigo ) return of(null);

    const url:string = `${ this._baseUrl }/alpha?codes=${ codigo }`;
    return this.httpClient.get<Pais>( url );
  }
}