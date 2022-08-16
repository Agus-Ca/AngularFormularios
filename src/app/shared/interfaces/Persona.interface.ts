import { Favorito } from "./Favorito.interface";



export interface Persona {
    nombre: string;
    favoritos: Favorito[];
}