function authMiddleware(req, res, next) {
  const token = req.headers['authorization']
// se não tiver token/estiver errado  bloquiar o acesso
  if (!token || token !== 'token-secreto') {
    return res.status(401).json({ erro: 'Acesso negado!' })
  }

  next()
}

module.exports = authMiddleware