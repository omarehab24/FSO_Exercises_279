import useUserBlogs from '../hooks/useUserBlogs'
import { Link, useRouteMatch } from 'react-router-dom'
import BlogFormTogglable from './BlogForm'
import { useUser } from '../hooks/useUser'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

function Blogs() {
  const { params } = useRouteMatch()
  const loggedUser = useUser()

  const blogsQuery = useUserBlogs(params.username)

  const blogs = blogsQuery.data

  if (blogsQuery.isFetching) {
    return <div>fetching data...</div>
  }

  if (blogsQuery.isError) {
    return <div>{blogsQuery.error.message}</div>
  }

  if (blogs.length === 0) {
    return <div>no blogs found</div>
  }

  return (
    <TableContainer component={Paper}>
      <h2>Blogs</h2>
      {!params.username && <BlogFormTogglable />}
      <Table>
        <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/users/${params.username || loggedUser.username}/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blogs