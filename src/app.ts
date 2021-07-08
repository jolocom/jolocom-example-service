import express from 'express'
import apiRoutes from './route/api'

const port = 8080
const app = express()

app.use('/api/v1', apiRoutes)

app.listen(port, () => {
  console.log(`App alive on http://localhost:${port}`)
})
