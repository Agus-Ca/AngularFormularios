import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  @ViewChild('miFormulario') miFormulario!:NgForm;

  initialForm = {
    product: 'Your product',
    price: 0,
    quantity: 0
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid 
           && this.miFormulario?.controls['producto']?.touched
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.touched
           && this.miFormulario?.controls['precio']?.value < 0;
  }

  getCampoErrors( campo:string ) {
    return this.miFormulario?.controls[campo]?.errors;
  }

  guardar() {
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      producto: 'Tu producto',
      precio: 0,
      existencias: 0
    });
  }
}