import { useSelector, useDispatch } from 'react-redux'
import { displayWelcome, clearNotifications } from '../reducers/notificationReducer'

const Notification = () => {
  
  const dispatch = useDispatch()

  const notification = useSelector( (state) => {

    if ( state.notification ) {

      setTimeout( () => {

        dispatch(clearNotifications())

      }, state.notification.duration)

      return state.notification.message
    }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification