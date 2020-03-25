import React, { useEffect, useState } from 'react'
import { FiAlertTriangle, FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { deleteIncident, getProfile } from '../../services/api'
import alertify from '../../utils/alertify'
import { Container } from './styles'

export default function Profile() {
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    async function getIncidents() {
      try {
        setIncidents(await getProfile(ongId))
      } catch (e) {
        alertify.error(e.message || 'Erro inesperado!')
      }
    }
    getIncidents()
  }, [ongId])

  async function handleDeleteIncident(incidentId) {
    try {
      await deleteIncident(incidentId, ongId)
      setIncidents(incidents.filter(incident => incident.id !== incidentId))
      alertify.success('Caso deletado com sucesso!')
    } catch (e) {
      alertify.error(e.message || 'Erro inesperado!')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <Container>
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.length === 0 && (
          <p className="empty">
            {' '}
            <FiAlertTriangle size={18} /> Nenhum caso cadastrado.
          </p>
        )}
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  )
}
