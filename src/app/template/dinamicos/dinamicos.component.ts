import { Component } from '@angular/core';

import { Persona } from 'src/app/shared/interfaces/Persona.interface';
import { Favorito } from '../../shared/interfaces/Favorito.interface';



@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  Persona: Persona = {
    nombre: 'Agustin',
    favoritos: [
      { id:1, nombre:'Metal Gear' },
      { id:2, nombre:'Death Stranding' }
    ]
  }

  nuevoJuego: string = '';

  guardar() {
    console.log('Formulario posteado')
  }

  agregarJuego():void {
    if(this.nuevoJuego.trim() == '') return;
    const nuevoFavorito:Favorito = {
      id: this.Persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    };
    this.Persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar( index:number ):void {
    this.Persona.favoritos.splice(index, 1);
  }
}