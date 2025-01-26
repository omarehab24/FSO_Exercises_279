import { useState, useRef } from "react"
import Togglable from "./Togglable"
import { useCreateBlogMutation } from '../hooks/useBlogOperations'
import { Button, TextField } from '@mui/material'

const BlogFormTogglable = () => {
    const blogFormRef = useRef()
    const createBlogMutation = useCreateBlogMutation()
   
    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        createBlogMutation(blogObject)
    }

    return (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

}

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                <TextField
                    type="text"
                    id="title"
                    label="Title"
                    onChange={(e) => setBlogTitle(e.target.value)}
                />
                </div>
               <div>
               <TextField
                    type="text"
                    id="author"
                    label="Author"
                    onChange={(e) => setBlogAuthor(e.target.value)}
                />
               </div>
               <div>
               <TextField
                    type="text"
                    id="url"
                    label="Url"
                    onChange={(e) => setBlogUrl(e.target.value)}
                />
               </div>
                <Button variant="contained" type="submit">create</Button>
            </form>
        </div>
    )
}

export default BlogFormTogglable