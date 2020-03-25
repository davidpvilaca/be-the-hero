import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

const login = async ongId => {
  try {
    const res = await api.post('sessions', { id: ongId })
    return res.data
  } catch (e) {
    throw new Error('ID não encontrado!')
  }
}

const createOng = async data => {
  try {
    const res = await api.post('ongs', data)
    return res.data
  } catch (e) {
    throw new Error('Erro ao criar ONG!')
  }
}

const getProfile = async ongId => {
  try {
    const res = await api.get('profile', {
      headers: {
        Authorization: ongId
      }
    })
    return res.data
  } catch (e) {
    throw new Error('Erro ao obter perfil!')
  }
}

const deleteIncident = async (incidentId, ongId) => {
  try {
    const res = await api.delete(`incidents/${incidentId}`, {
      headers: {
        Authorization: ongId
      }
    })
    return res.data
  } catch (e) {
    throw new Error('Erro ao deletar caso!')
  }
}

const createIncident = async (data, ongId) => {
  try {
    const res = await api.post('incidents', data, {
      headers: {
        Authorization: ongId
      }
    })
    return res.data
  } catch (e) {
    throw new Error('Erro ao criar caso!')
  }
}

export { login, createOng, getProfile, deleteIncident, createIncident }
