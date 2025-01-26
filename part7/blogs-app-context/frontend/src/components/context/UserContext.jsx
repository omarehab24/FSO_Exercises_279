import { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

export default UserContext

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'CLEAR_USER':
            return null
        default:
            return state
    }
}

export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const user = useContext(UserContext)[0]
    return user
}

export const useUserDispatchContext = () => {
    const dispatch = useContext(UserContext)[1]
    return dispatch
}