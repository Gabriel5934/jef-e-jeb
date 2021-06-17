import * as fs from 'fs'
import * as path from 'path'

let chaptersHashes = "7tn0chvqwd" // TODO

let chaptersCount = fs.readdirSync(path.join(__dirname, '../../../public/content/images/chapters-covers')).length

export {chaptersHashes, chaptersCount}