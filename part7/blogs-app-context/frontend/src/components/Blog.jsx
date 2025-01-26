import { useRef } from 'react'
import { useUser } from '../hooks/useUser'
import { useParams } from 'react-router-dom'
import { useUpdateBlogsMutation, useDeleteBlogMutation, useCommentMutation } from '../hooks/useBlogOperations'
import { useFetchBlog } from '../hooks/useFetchBlog'
import {Button} from '@mui/material'

const Blog = () => {
  const loggedUser = useUser()
  const { id } = useParams()

  const updateBlogsMutation = useUpdateBlogsMutation()
  const deleteBlogMutation = useDeleteBlogMutation()
  const commentMutation = useCommentMutation()
  const commentInput = useRef()

  const blogQuery = useFetchBlog(id)

  if (blogQuery.isFetching) {
    return <div>fetching data...</div>
  }

  const blog = blogQuery.data

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogsMutation({ blogId: blog.id, updatedBlog })
  }

  const addComment = (event) => {
    event.preventDefault()
    commentMutation({ blogId: blog.id, comment: commentInput.current.value })
    commentInput.current.value = ''
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation(blog.id)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes: {blog.likes}
        {loggedUser && <Button onClick={likeBlog}>like</Button>}
      </p>
      <br />
      {loggedUser.id === blog.user && (
        <Button onClick={removeBlog}>Delete Blog</Button>
      )}

      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input type="text" ref={commentInput} />
       <Button type="submit">add comment</Button>
      </form>

      <ul>
        {blog.comments.length === 0 ? 'no comments yet' : blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog