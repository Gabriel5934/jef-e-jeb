import { Router } from 'express'

import {chaptersHashes, chaptersCount} from './models/chapters'

const routes = Router()

// Homepage
routes.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  res.render('index', {
    chaptersCount: chaptersCount,
    chaptersHashes: chaptersHashes
  })
})

routes.get('/capitulo/*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')

  res.render('chapter', {
    chapterHash: chaptersHashes // TODO
  })
})


export default routes
