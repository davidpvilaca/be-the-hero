import axios from 'axios'
import { IIncidentQueryData } from '../interfaces'

const api = axios.create({ baseURL: 'http://10.0.0.100:3333' })

const getIncidents = async (page = 1) => {
  const res = await api.get<IIncidentQueryData[]>('incidents', {
    params: {
      page
    }
  })
  return {
    page,
    count: Number(res.headers['x-total-count']),
    result: res.data
  }
}

export { getIncidents }
