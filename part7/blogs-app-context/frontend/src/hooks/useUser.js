import { useUserContext, useUserDispatchContext } from '../components/context/UserContext'
import blogService from '../services/blogs'

export const useUser = () => useUserContext()
export const useSetUserDispatch = () => {
    const dispatch = useUserDispatchContext()

    return function setUser(user) {
        blogService.setToken(user.token)
        dispatch({type: 'SET_USER', payload: user})
    }
}
export const useClearUserDispatch = () => {
    const dispatch = useUserDispatchContext()

    return function clearUser() {
        dispatch({type: 'CLEAR_USER'})
    }
}