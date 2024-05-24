import { Uva } from "../uva/uva.model";

export class Vino {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number | null,
        public region: number | null,
        public tipo: number | null,
        public bodega: number | null,
        public anada: number | null,
        public alergenos: string,
        public graduacion: number | null,
        public breveDescripcion: string,
        public capacidad: number | null,
        public stock: number | null,
        public imagen: string | null,
        public uvas: {
            'uva' : Uva, 
            'porcentaje' : number
        }[] | null
    ) { }
}