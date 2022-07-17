import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          types: string
 *          default: jane.doe@example.com
 *        name:
 *          types: string
 *          default: Jane Doe
 *        password:
 *          types: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          types: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          types: string
 *        name:
 *          types: string
 *        _id:
 *          types: string
 *        createdAt:
 *          types: string
 *        updatedAt:
 *          types: string
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Name is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.cofirmationPassword'
>
