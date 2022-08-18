import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    this.miFormulario.valueChanges.subscribe( ({condiciones, ...rest}) => {
      this.persona = rest;
    })
  }

  miFormulario: FormGroup = this.formBuilder.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [ false, [Validators.required, Validators.requiredTrue] ]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  guardar() {
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;

    this.persona = formValue;
  }
}