import * as crypto from 'crypto'

const generateUniqueId = () => {
  crypto.randomBytes(4).toString('HEX')
}

export default generateUniqueId
