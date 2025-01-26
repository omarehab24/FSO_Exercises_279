const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { title: 1, author: 1 })
    response.json(users)
})

usersRouter.get("/:username", async (request, response) => {
  const user = await User.findOne({ username: request.params.username }).populate("blogs", { title: 1, author: 1, url: 1, likes: 1, comments: 1 })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

// Create a new user
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password || !name) {
    return response.status(400).json({ error: "username, name and password are required" })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: "password must be at least 3 characters long" })
  }

  const reg = /^[a-zA-Z ]+$/
  if (!reg.test(name)) {
    return response.status(400).json({ error: "name must be only letters" })
  }

  const saltRounds = 10 
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete("/:id", async (request, response) => {

  if (!request.token) {
    return response.status(401).json({ error: "authentication required" })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(decodedToken.id)
  
  if (!user) {
    return response.status(404).json({ error: "user not found" })
  }

  await User.findByIdAndDelete(decodedToken.id)
  response.status(204).end()
})

module.exports = usersRouter