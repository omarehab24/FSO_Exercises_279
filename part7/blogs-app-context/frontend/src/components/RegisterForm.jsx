import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

import userService from '../services/users'
import { useNotificationSuccess, useNotificationError } from '../hooks/useNotification'
import { useHistory } from 'react-router-dom'

function RegisterForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const notificationSuccess = useNotificationSuccess()
    const notificationError = useNotificationError()

    const history = useHistory()

    const handleRegister = (event) => {
        event.preventDefault()
        userService
            .create({ username, name, password })
            .then(user => {
                history.push('/')
                notificationSuccess({ message: `user ${user.username} registered successfully` })
            })
            .catch(error => {
                notificationError({ message: error.response.data.error })
            })
    }

    return (
        <div>
            <h2>Register</h2>

            <Box
                component="form"
                onSubmit={handleRegister}
            >
                <div>
                    <TextField
                        required
                        type="text"
                        id="username"
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        type="text"
                        id="name"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        type="password"
                        id="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Register
                </Button>
            </Box>

        </div>
    )
}

export default RegisterForm