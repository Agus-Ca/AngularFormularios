import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';

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
  }

  miFormulario:FormGroup = this.formBuilder.group({
    region: [ '', [ Validators.required ]]
  }); 

  // Llenar selectores
  regiones:string[] = [];


  guardar() {
    console.log( this.miFormulario );
  }
}