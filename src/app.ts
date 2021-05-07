import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    // this.database()
    this.routes()
    this.express.set('view engine', 'ejs')
    this.express.set('views', 'src/views')
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.static(path.join(__dirname, './content')))
  }

  // private database (): void {
  //   mongoose.connect(dbURI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  // }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
