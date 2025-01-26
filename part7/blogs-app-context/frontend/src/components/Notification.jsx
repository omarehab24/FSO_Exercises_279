import { useNotificationValue } from "../hooks/useNotification"
import {Alert} from '@mui/material'

const Notification = () => {

  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  return (
    <div>
  {(notification.message &&
    <Alert severity= {notification.type} >
      {notification.message}
    </Alert>
  )}
</div>
  )
}

export default Notification