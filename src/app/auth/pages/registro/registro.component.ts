import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Agustin Casado',
      email: 'agu.e.casado@gmail.com',
      username: 'Agus'
    })
  }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre:    ['', [ Validators.required, Validators.pattern(this.validationService.nombreApellidoPattern) ]],
    email:     ['', [ Validators.required, Validators.email, Validators.pattern(this.validationService.emailPattern)], [this.emailValidatorService]],
    username:  ['', [ Validators.required, this.validationService.noPuedeSerAgusCa ]],
    password:  ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]]
  }, {
    validators: [ this.validationService.camposIguales('password', 'password2') ]
  })

  campoNoValido( campo:string ) {
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required'] &&
           this.miFormulario.get('email')?.touched
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.['pattern'] &&
           this.miFormulario.get('email')?.touched
  }

  emailTomado() {
    return this.miFormulario.get('email')?.errors?.['emailTomado'] &&
           this.miFormulario.get('email')?.touched
  }

  submitFormulario() {
    console.log(this.miFormulario);
    this.miFormulario.markAllAsTouched();
  }
}