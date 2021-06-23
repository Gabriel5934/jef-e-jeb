
import * as express from 'express'
import * as functions from 'firebase-functions'

import routes from './routes'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('../../public'))
app.use(routes)

exports.app = functions.https.onRequest(app)