import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private paisesService:PaisesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => 
    //   { 
    //     console.log(region);
    //     this.paisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         console.log(paises);
    //         this.paises = paises;
    //       })
    //   });

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        } ),
        switchMap( region => this.paisesService.getPaisesPorRegion( region ) ) )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      } );

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('paisesFronterizos')?.reset('');
          this.cargando = true;
        }),
        switchMap( ( codigo ) => this.paisesService.getPaisPorCodigo( codigo ) ),
        switchMap( pais => this.paisesService.getPaisesPorCodigos( pais?.borders! ) )
      )
      .subscribe( paises => {
        this.paisesFronterizos = paises;
        this.cargando = false;
      } );
  }

  miFormulario:FormGroup = this.formBuilder.group({
    region            : [ '', [ Validators.required ] ],
    pais              : [ '', [ Validators.required ] ],
    paisesFronterizos : [ '', [ Validators.required ] ]
  }); 

  // Llenar selectores
  regiones          : string[]    = [];
  paises            : PaisSmall[] = [];
  paisesFronterizos : PaisSmall[]    = [];

  // UI
  cargando : boolean = false;

  guardar() {
    console.log( this.miFormulario );
  }
}