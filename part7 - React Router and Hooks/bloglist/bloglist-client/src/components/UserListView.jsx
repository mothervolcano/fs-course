import { useSelector } from "react-redux"
import User from './User'

const containerStyle = {

	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridTemplateRows: '1fr auto',
	gridAutoFlow: 'row'
}

const headerLabels = {
	gridColumn: '2 / 3'
}

const userRow = {
	gridColumn: '1 / 2'
}

const userStats = {
	gridColumn: '2 / 3'
}

const UserListView = () => {

	const users = useSelector( state => state.users )

	console.log('@UserListView.users: ', users)

	return <div>
		
		<div style={containerStyle}>
			<div style={headerLabels}>blogsCreated</div>
			{users.map( (u) => {

				return (<User
							key={u.username} 
				        	user={u}
				        />)

			} )}
		</div>

	</div>

}


export default UserListView