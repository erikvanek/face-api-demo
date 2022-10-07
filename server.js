const express = require("express")

const app = express()
const port = 3000

// app.get('/', (req, res) => {
  app.use('/', express.static('public'))
// })

// app.get('/models', (req, res) => {
//   console.log('models')
  app.use('/models/', express.static('models'))
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})