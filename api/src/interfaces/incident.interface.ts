import { IOng } from './ongs.interface'

export interface IIncident {
  id: number
  title: string
  description: string
  value: number
  ong_id: string
}

export interface IIncidentQueryData extends IIncident {
  ong: IOng
}
