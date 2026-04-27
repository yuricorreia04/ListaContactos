import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Contactos() {
  const [contactos, setContactos] = useState([])
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const navigate = useNavigate()

  // Token guardado no login, enviado em todos os pedidos à API
  const headers = { authorization: localStorage.getItem('token') }

  useEffect(() => {
    const controller = new AbortController()

    // Vai buscar os contactos ao servidor quando a página carrega
    axios.get('http://localhost:3000/contactos', { headers, signal: controller.signal })
      .then(res => setContactos(res.data))
      .catch(err => { if (err.name !== 'CanceledError') alert('Erro ao carregar.') })

    // Disconnect — cancela o pedido se o utilizador sair da página antes de terminar
    return () => controller.abort()
  }, [])

  function handleAdicionar() {
    // POST — envia nome e telefone para o servidor
    axios.post('http://localhost:3000/contactos', { nome, telefone }, { headers })
      .then(res => {
        // Adiciona o novo contacto à lista 
        setContactos([...contactos, res.data])
        setNome('')
        setTelefone('')
      })
      .catch(err => alert(err.response?.data?.erro || 'Erro ao adicionar.'))
  }

  function handleApagar(id) {
    // DELETE — envia o ID do contacto a apagar
    axios.delete(`http://localhost:3000/contactos/${id}`, { headers })
      .then(() => {
        // Remove o contacto
        setContactos(contactos.filter(c => c.id !== id))
      })
      .catch(() => alert('Erro ao apagar.'))
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Livro de Contactos</h2>

      {/* Logout — remove o token e volta ao login */}
      <button onClick={() => { localStorage.removeItem('token'); navigate('/') }}>Sair</button>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '250px' }}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
        <button onClick={handleAdicionar}>Adicionar</button>
      </div>

      {/* Lista de contactos vindos do servidor */}
      <ul style={{ marginTop: '20px' }}>
        {contactos.map(c => (
          <li key={c.id} style={{ marginBottom: '8px' }}>
            <strong>{c.nome}</strong> — {c.telefone}
            <button onClick={() => handleApagar(c.id)} style={{ marginLeft: '10px' }}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contactos