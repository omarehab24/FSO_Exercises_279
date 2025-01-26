import {useMutation, useQueryClient } from "@tanstack/react-query"
import blogService from '../services/blogs'
import { useNotificationSuccess, useNotificationError } from './useNotification'
import { useHistory } from 'react-router-dom'

export const useCreateBlogMutation = () => {
    const queryClient = useQueryClient()
    const notificationSuccess = useNotificationSuccess()
    const notificationError = useNotificationError()
    
    
    const {mutate: createBlogMutation} = useMutation({
    mutationFn: async (blogObject) => {
        await blogService.create(blogObject)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
        notificationSuccess({ message: 'blog added successfully'})
    },
    onError: () => {
        notificationError({ message: 'failed to add blog'})
    }
})

return createBlogMutation
}


  export const useUpdateBlogsMutation = () =>{
    const notificationError = useNotificationError()
    const queryClient = useQueryClient()
    
    const {mutate: updateBlogsMutation} = useMutation({
    mutationFn: async ({blogId, updatedBlog}) => {
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      return returnedBlog
    },
    onSuccess: (blogId) => {
      queryClient.invalidateQueries(['blog', blogId])
    },
    onError: () => {
      notificationError({ message: 'failed to update blog', type: 'error' })
    }
  })

  return updateBlogsMutation

}

export const useCommentMutation = () => {
  const queryClient = useQueryClient()
  
  const {mutate: commentMutation} = useMutation({
    mutationFn: async ({blogId, comment}) => {
      const returnedBlog = await blogService.comment(blogId, {comment})
      return returnedBlog
    },
    onSuccess: (blogId) => {
      queryClient.invalidateQueries(['blog', blogId])
    },
    onError: (error) => {
      throw error
    }
  })

  return commentMutation

}

export const useDeleteBlogMutation = () => {
  const notificationSuccess = useNotificationSuccess()
  const notificationError = useNotificationError()
  const queryClient = useQueryClient()
  const history = useHistory()
  
  
const {mutate: deleteBlogMutation} = useMutation({
  mutationFn: async (blogId) => {
    return await blogService.remove(blogId)
  },
  onSuccess: () => {
    history.push('/')
    queryClient.invalidateQueries(['blogs'])
    notificationSuccess({ message: 'blog removed successfully', type: 'success' })
  },
  onError: () => {
    notificationError({ message: 'failed to remove blog', type: 'error' })
  }
})

return deleteBlogMutation

}