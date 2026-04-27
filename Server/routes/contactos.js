const express = require('express')
const router = express.Router()

// Lista guardada no servidor
let contactos = []

router.get('/', (req, res) => {
  res.status(200).json(contactos)
})


router.post('/', (req, res) => {
  const { nome, telefone } = req.body

  if (!nome || !telefone) {
    return res.status(400).json({ erro: 'Nome e telefone são obrigatórios.' })
  }

  const novo = { id: Date.now(), nome, telefone }
  contactos.push(novo)
  res.status(201).json(novo)
})


router.delete('/:id', (req, res) => {
  const index = contactos.findIndex(c => c.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ erro: 'Contacto não encontrado.' })
  }

  contactos.splice(index, 1)
  res.status(200).json({ mensagem: 'Contacto apagado!' })
})

module.exports = router