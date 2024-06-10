import { Bodega } from "../bodega/bodega.model";
import { Region } from "../region/region.model";
import { Tipo } from "../tipo/tipo.model";
import { Uva } from "../uva/uva.model";

export class Vino {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number | null,
        public region: Region,
        public tipo: Tipo,
        public bodega: Bodega,
        public anada: number | null,
        public alergenos: string,
        public graduacion: number | null,
        public breveDescripcion: string,
        public capacidad: number | null,
        public stock: number | null,
        public imagenes: {
            'imgAnv' : Blob | null,
            'imgRev' : Blob | null,
            'imgDet' : Blob | null
        },
        public uvas: {
            'Id': number,
            'Nombre' : string, 
            'Porcentaje' : number
        }[] | null
    ) { }
}