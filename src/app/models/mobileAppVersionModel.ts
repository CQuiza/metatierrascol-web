
export class MobileAppVersionModel {
  constructor(
    public id: number,
    public version: number,
    public archivo: string,
    public publicar: false,
    public fecha: Date,
    public creado_por: number,
    public url_descarga: string
  ) {}
}