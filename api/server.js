require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')
const jwtDecode = require('jwt-decode')
const mongoose = require('mongoose')

const User = require('./data/User')
const {createToken, hashPassword, verifyPassword} = require('./util')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/api/authenticate', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({
      email,
    }).lean()

    if (!user) {
      return res.status(403).json({
        message: 'Wrong email or password.',
      })
    }

    const passwordValid = await verifyPassword(password, user.password)

    if (passwordValid) {
      const {password, bio, ...rest} = user
      const userInfo = Object.assign({}, {...rest})

      const token = createToken(userInfo)

      const decodedToken = jwtDecode(token)
      const expiresAt = decodedToken.expiresAt

      res.json({
        message: 'autentication succesful!',
        token,
        userInfo,
        expiresAt,
      })
    } else {
      res.status(403).json({
        message: 'Wrong email or password.',
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({message: 'Somethng went wrong.'})
  }
})

app.post('/api/signup', async (req, res) => {
  try {
    const {email, firstName, lastName} = req.body

    const hashedPassword = await hashPassword(req.body.password)

    const userData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
      role: 'admin',
    }

    const existingEmail = await User.findOne({
      email: userData.email,
    }).lean()

    if (existingEmail) {
      return res.status(400).json({message: 'Email already exists'})
    }

    const newUser = new User(userData)
    const savedUser = await newUser.save()

    if (savedUser) {
      const token = createToken(savedUser)
      const decodedToken = jwtDecode(token)
      const expiresAt = decodedToken.exp

      const {firstName, lastName, email, role} = savedUser

      const userInfo = {
        firstName,
        lastName,
        email,
        role,
      }

      return res.json({
        message: 'User created!',
        token,
        userInfo,
        expiresAt,
      })
    } else {
      return res.status(400).json({
        message: 'There was a problem creating you account',
      })
    }
  } catch (err) {
    return res.status(400).json({
      message: 'There was a issues creating your account',
    })
  }
})

const attachUser = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({message: 'authenticatino invalid'})
  }
  const decodedToken = jwtDecode(token.slice(7))

  if (!decodedToken) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request',
    })
  } else {
    req.user = decodedToken
    next()
  }
}

app.use(attachUser)

async function connect() {
  try {
    mongoose.Promise = global.Promise
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUniiedTopology: true,
      useFindAndModify: true,
    })
  } catch (err) {
    console.log('Mongoose error', err)
  }
  app.listen(3001)
  console.log('API listening on localhost:3001')
}

connect()
