import { createHash } from 'crypto'

export function encrypt(toEncrypt) {
  const hash = createHash('sha256')
  hash.update(toEncrypt)

  return hash.digest('hex')
}
