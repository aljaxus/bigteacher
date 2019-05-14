const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')


const expressApp = express()
  .use(bodyParser.json())
  .use(express.static(path.resolve(__dirname, 'dist')))

const appServer = expressApp.listen(8000, '0.0.0.0', () => {
  console.log('Started the server\n  http://localhost:8000')
})