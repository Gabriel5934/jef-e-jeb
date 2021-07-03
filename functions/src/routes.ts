import { Router } from 'express'

const routes = Router()

// TEMPORARY
const chapters = [1, 2, 3, 4, 5]
const chaptersCount = chapters.length
interface ChaptersUrls {
  [key: string]: any
}
const chaptersUrls : ChaptersUrls = {
  1: 'djqv',
  2: 'rrar',
  3: 'wikt',
  4: 'htso',
  5: 'ygtp'
}

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
  let requestedChapter = +requestSegments[requestSegments.length - 1]

  if (chapters.includes(requestedChapter)) {
    res.render('chapter', {
      chapter : requestedChapter,
      next: chapters.includes(requestedChapter + 1) ? requestedChapter + 1 : false,
      previous: chapters.includes(requestedChapter - 1) ? requestedChapter - 1 : false,
      chapterUrl: chaptersUrls[requestedChapter]
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

