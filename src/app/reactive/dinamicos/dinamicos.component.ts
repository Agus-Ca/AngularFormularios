import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Favorito } from '../../shared/interfaces/Favorito.interface';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre    : ['', [Validators.required, Validators.minLength(3)]],
    favoritos : this.formBuilder.array( 
                                  [
                                    [ 'Metal Gear', Validators.required ],
                                    [ 'Death Stranding', Validators.required ]
                                  ], [ Validators.required ])
  });

  nuevoFavorito: FormControl = this.formBuilder.control( '', Validators.required);

  campoNoEsValido( campo:string ) {
    return this.miFormulario?.get(campo)?.errors &&
           this.miFormulario?.get(campo)?.touched;
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return;

    this.favoritosArray.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  borrarFavorito( i:number ) {
    this.favoritosArray.removeAt(i);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log( this.miFormulario.value )
  }

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
}