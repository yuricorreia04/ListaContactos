import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  // verifica se existe token guardado no browser
  const token = localStorage.getItem('token')

  // se não tiver token, redireciona para o login
  // se tiver, mostra a página pedida
  return token ? children : <Navigate to="/" />
}

export default PrivateRoute