export class Vino {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number | null,
        public region: string | null,
        public tipo: string | null,
        public bodega: string | null,
        public anada: number | null,
        public alergenos: string | null,
        public graduacion: number | null,
        public breveDescripcion: string | null,
        public capacidad: number | null,
        public stock: number | null,
    ) { }
}