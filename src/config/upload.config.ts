import multer from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const folderTmp = resolve(__dirname, '..', '..', 'tmp')

export default {
  storage: multer.diskStorage({
    destination: folderTmp,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`
      return callback(null, fileName)
    },
  }),
}
