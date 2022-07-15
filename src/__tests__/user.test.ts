import mongoose from 'mongoose'
import supertest from 'supertest'
import createServer from '../utils/server'
import * as UserService from '../service/user.service'

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
}

const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123',
}

describe('user', () => {
  // user registeration

  describe('User registeration', () => {
    describe('given the user name and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload)

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(userInput)

        expect(statusCode).toBe(200)

        expect(body).toEqual(userPayload)

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
      })
    })

    describe("given the password don't match", () => {
      it('should return a 400', () => {})
    })

    describe('given the user service throws', () => {
      it('should return a 409 error', () => {})
    })
  })

  describe('create user session', () => {
    describe('given the username and password are valid', () => {
      it('should return a signed accessToken & refreshToken', () => {})
    })
  })
})
