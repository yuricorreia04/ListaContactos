import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Contactos from './pages/Contactos'
import PrivateRoute from './components/PrivateRoute'
//proteger paginas que só podem ser acessadas por usarios autenticados
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/contactos" element={
        <PrivateRoute><Contactos /></PrivateRoute>
      } />
    </Routes>
  )
}

export default App