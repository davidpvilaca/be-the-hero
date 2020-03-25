import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { createIncident } from '../../services/api'
import alertify from '../../utils/alertify'
import { Container } from './styles'

export default function NewIncident() {
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewIncident(e) {
    e.preventDefault()

    try {
      await createIncident({ title, description, value }, ongId)
      alertify.success('Caso criado com sucesso!')
      history.push('/profile')
    } catch (e) {
      alertify.error(e.message || 'Erro inesperado!')
    }
  }

  return (
    <Container>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em R$"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  )
}
