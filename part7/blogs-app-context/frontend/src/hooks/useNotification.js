import { useNotificationDispatchContext, useNotificationValueContext } from '../components/context/NotificationContext'

export const useNotificationValue = () => {
    const notification = useNotificationValueContext()
    return notification
}

export const useNotificationSuccess = () => {
    const dispatch = useNotificationDispatchContext()
    
    return function notificationSuccess({ message }) {
        dispatch({type: 'SET_NOTIFICATION_SUCCESS', payload: { message, type : 'success' }})
        setTimeout(() => {
          dispatch({type: 'CLEAR_NOTIFICATION'})
        }, 5000)
    }
}

export const useNotificationError = () => {
    const dispatch = useNotificationDispatchContext()

    return function notificationError({ message }) {
        dispatch({type: 'SET_NOTIFICATION_ERROR', payload: { message , type : 'error' }})
        setTimeout(() => {
          dispatch({type: 'CLEAR_NOTIFICATION'})
        }, 5000)
    }
}
