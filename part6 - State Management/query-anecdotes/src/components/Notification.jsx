import { useNotificationState, useNotificationDispatch } from "../NotificationContext"

const Notification = () => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationState = useNotificationState()
  const dispatchNotification = useNotificationDispatch()
  
  if (notificationState.type==='CLEAR') { return null }
  else {

      setTimeout( () => {

        dispatchNotification({type: 'CLEAR'})

      }, notificationState.duration)
    }

  return (

    <div style={style}>

      {notificationState.message}
      
    </div>
  )
}

export default Notification
