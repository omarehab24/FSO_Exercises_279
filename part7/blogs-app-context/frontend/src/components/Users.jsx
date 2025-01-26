import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const users = await userService.getAllUsers()
            console.log('fetching users...');
            setUsers(users)
        }
        fetchUsers()
    }, [])

    const { url } = useRouteMatch()

    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {users.map(user =>
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`${url}/${user.username}/blogs`}>{user.username}</Link>
                                </TableCell>
                                <TableCell>
                                    {user.blogs.length} blogs
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users