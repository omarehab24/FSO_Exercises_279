import { useQueryClient } from "@tanstack/react-query"
import { useClearUserDispatch } from './useUser'
import { useHistory } from 'react-router-dom'


export const useHandleLogout = () => {
    const history = useHistory()

    const queryClient = useQueryClient()
    const clearUser = useClearUserDispatch()

    return function handleLogout() {
        window.localStorage.removeItem('loggedBlogAppUser')
        clearUser()
        queryClient.setQueryData(['blogs'], [])
        history.push('/')

    }
  }