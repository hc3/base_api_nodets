import server from './app'
import { createConnection } from 'typeorm'

(async () => {
    await createConnection()
})()

server.listen(3000, () => {
    console.log('[SERVER] Running at localhost:3000')
})