import { Link } from 'react-router-dom'
import { useHandleLogout } from '../hooks/useHandleLogout'
import { useUser } from '../hooks/useUser'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'

function Navbar() {
  const handleLogout = useHandleLogout()
  const user = useUser()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit">
          <Link to="/">home</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">users</Link>
        </Button>
        <Button color="inherit">
          {user
            ? <em>{user.name} logged in</em>
            : <Link to="/login">login</Link>
          }
        </Button>
        {user &&
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        }
        {!user &&
          <Button color="inherit">
            <Link to="/register">register</Link>
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar