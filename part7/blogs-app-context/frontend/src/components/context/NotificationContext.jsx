import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

export default NotificationContext

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION_SUCCESS':
            return action.payload
        case 'SET_NOTIFICATION_ERROR':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValueContext = () => {
    const notification = useContext(NotificationContext)[0]
    return notification
}

export const useNotificationDispatchContext = () => {
    const dispatch = useContext(NotificationContext)[1]
    return dispatch
}