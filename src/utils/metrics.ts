import express from 'express'
import client from 'prom-client'
import log from './logger'

const app = express()

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics

  collectDefaultMetrics()

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType)

    return res.send(await client.register.metrics())
  })

  app.listen(9100, () => {
    log.info('Metrics server started at http://localhost:9100')
  })
}