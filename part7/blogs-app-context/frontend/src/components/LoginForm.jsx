import { useState } from "react"

import loginService from "../services/login"
import blogService from "../services/blogs"

import { useNotificationSuccess, useNotificationError } from '../hooks/useNotification'
import { useSetUserDispatch } from '../hooks/useUser'

import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const notificationSuccess = useNotificationSuccess()
  const notificationError = useNotificationError()

  const setUser = useSetUserDispatch()

  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
      notificationSuccess({message: 'logged in successfully'})
      history.push('/')

    } catch (exception) {
      notificationError({ message: 'wrong username or password'})
      throw exception
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField type="text" label="username" id="username" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <TextField type="password" label="password" id="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm