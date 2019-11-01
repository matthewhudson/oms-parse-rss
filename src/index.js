#!/usr/bin/env node

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const feedParser = require('feedparser-promised')

app.use(bodyParser.json())

const port = process.env.PORT || 8080

app.post('/parse', async (req, res) => {
  const { url = '' } = req.body

  await feedParser
    .parse(url)
    .then(items => {
      res.json({ items })
    })
    .catch(er => {
      res.status(500).json({ error: er.message || er })
    })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)
