import { Router } from 'express'

const routes = Router()

// Homepage
routes.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  res.render('index')
})

export default routes