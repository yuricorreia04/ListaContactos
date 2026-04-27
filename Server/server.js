const express = require('express')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')
const contactosRoutes = require('./routes/contactos')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/contactos', authMiddleware, contactosRoutes)

app.listen(3000, () => console.log('Servidor na porta 3000'))