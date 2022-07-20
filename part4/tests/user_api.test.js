const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

describe('only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('asdasdasd', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
      username: 'asduser',
      name: 'asd abc',
      password: 'asdasdasd',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length + 1)

    const usernames = finaluser.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation if username already exists', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
     "username": "root",
     "name": "abc",
     "password": "asfdasfasd"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` should be unique')

    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length)
  })

  test('creation fails with proper statuscode and message if username has length smaller than 3', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
      username: 'r',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length)
  })

  test('creation fails with proper statuscode and message if password has length smaller than 3', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
      username: 'root',
      name: 'abc',
      password: 'as',
         }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length)
  })

  test('creation fails if username is not given', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
      name: 'abc',
      password: 'as',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length)
  })

  test('creation fails if password is not given', async () => {
    const initialuser = await helper.Dbusers()

    const newUser = {
      name: 'abc',
      password: 'as',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const finaluser = await helper.Dbusers()
    expect(finaluser).toHaveLength(initialuser.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})