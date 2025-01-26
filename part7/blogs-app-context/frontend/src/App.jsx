import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Navbar from './components/Navbar'

import { useUser, useSetUserDispatch } from './hooks/useUser'

const App = () => {

  const user = useUser()
  const setUser = useSetUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <Container>

        <Notification />
        <Navbar />

        {!user && 
        <Switch>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route exact path='/register'>
            <RegisterForm />
          </Route>
        </Switch>
        }

        {user && (
          <div>
            <Switch>
              <Route exact path='/'>
                <Blogs />
              </Route>
              <Route exact path='/users' component={Users} />
              <Route exact path='/users/:username/blogs' component={Blogs} />
              <Route exact path='/users/:username/blogs/:id' component={Blog} />
  
            </Switch>
          </div>

        )}

    </Container>
  )
}


export default App