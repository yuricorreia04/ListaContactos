import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  function handleLogin() {
    if (user && pass) {
      localStorage.setItem('token', 'token-secreto')
      navigate('/contactos')
    } else {
      alert('Preenche os dois campos!')
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Login</h2>
      <input placeholder="Utilizador" onChange={e => setUser(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}

export default Login