import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { login } from '../../services/api'
import alertify from '../../utils/alertify'
import { Container } from './styles'

export default function Logon() {
  const [id, setId] = useState('')

  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const { name } = await login(id)
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', name)
      history.push('/profile')
    } catch (e) {
      alertify.error(e.message || 'Erro inesperado!')
    }
  }

  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </Container>
  )
}
