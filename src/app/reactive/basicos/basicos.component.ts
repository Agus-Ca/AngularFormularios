import { Component, OnInit } from '@angular/core';
import { FormGroup, /*FormControl,*/ FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre      : 'GTX 1660Super',
      precio      : 80000,
      existencias : 10
    })
  }

  // miFormulario:FormGroup = new FormGroup({
  //   nombre      : new FormControl('RTX 3090'),
  //   precio      : new FormControl(1500),
  //   existencias : new FormControl(5),
  // })

  miFormulario: FormGroup = this.formBuilder.group({
    nombre      : [ , [Validators.required, Validators.minLength(3)] ],
    precio      : [ , [Validators.required, Validators.min(0)] ],
    existencias : [ , [Validators.required, Validators.min(0)] ],
  });

  campoNoEsValido( campo:string ) {
    return this.miFormulario?.get(campo)?.errors &&
           this.miFormulario?.get(campo)?.touched;
  }

  guardar() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}