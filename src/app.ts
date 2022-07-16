import express, { Request, Response } from 'express'
import config from 'config'
import responseTime from 'response-time'
import connect from './utils/connect'
import logger from './utils/logger'
import createServer from './utils/server'
import { restResponseTimeHistogram, startMetricsServer } from './utils/metrics'

const port = config.get<number>('port')

const app = createServer()

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      console.log('Hi, There')
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      )
    }
  })
)

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)

  await connect()

  startMetricsServer()
})
