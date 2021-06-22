import { Router } from 'express'

import * as fs from 'fs'
import * as path from 'path'

const routes = Router()
const chaptersCount = fs.readdirSync(path.join(__dirname, '../../public/content/images/chapters-covers')).length
const chapters = [1, 2, 3, 4, 5]

// Homepage
routes.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  res.render('index', {
    chaptersCount: chaptersCount,
  })
})

// Capítulos
routes.get('/capitulo/*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')

  let requestSegments = req.path.split('/')
  let requestedChapter : number = +requestSegments[requestSegments.length - 1]

  if (chapters.includes(requestedChapter)) {
    res.render('chapter', {
      chapter : requestedChapter,
      next: chapters.includes(requestedChapter + 1) ? requestedChapter + 1 : false,
      previous: chapters.includes(requestedChapter - 1) ? requestedChapter - 1 : false
    })
  } else {
    res.render('notFound')
  }
})

// 404 
routes.get('*', (req, res) => {
  res.status(404).render('404')
})

export default routes

