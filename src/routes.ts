import { Express, Request, Response } from 'express'
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from './controller/product.controller'
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller'
import { createUserHandler } from './controller/user.controller'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateUserResponse'
   *        409:
   *          description: Conflict
   *        400:
   *          description: Bad request
   */
  app.post('/api/users', validateResource(createUserSchema), createUserHandler)

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  )

  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  app.post(
    '/api/products',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  )

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  )

  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  )

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  )
}

export default routes
