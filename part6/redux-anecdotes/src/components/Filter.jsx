import { useDispatch } from 'react-redux'
import { filterWith } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    
    console.log('@Filter.handleChange: ', event.target.value)

    if ( event.target.value !== '' ) {
      dispatch(filterWith(event.target.value))
    }
  }

  const style = {

    marginBottom: 10
  }

  return (

    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter