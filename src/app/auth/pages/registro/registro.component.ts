import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Agustin Casado',
      email: 'agu.e.casado@gmail.com'
    })
  }

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [ Validators.required, Validators.pattern(this.nombreApellidoPattern) ]],
    email:  ['', [ Validators.required, Validators.email, Validators.pattern(this.emailPattern)]]
  })

  campoNoValido( campo:string ) {
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario);
    this.miFormulario.markAllAsTouched();
  }
}