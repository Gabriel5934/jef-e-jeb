import express, { response } from 'express'
import path from 'path'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, '../content')))

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3333)
