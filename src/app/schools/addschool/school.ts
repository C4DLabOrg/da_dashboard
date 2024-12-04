export class SchoolRegistration {
  constructor(
    public schoolName: string,
    public schoolCode: number,
    public emisCode: string,
    public waterSource: string,
    public zone: string,
    public county: string,
    public long_geo_cordinates: string,
    public lat_geo_cordinates: string
  ){}
}
