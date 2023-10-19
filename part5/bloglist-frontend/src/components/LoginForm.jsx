import PropTypes from 'prop-types'

const LoginForm = (props) => {

  const { handleSubmit, 
    handleUsernameChange, 
    handlePasswordChange, 
    username, 
    password } = props
    
  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label>username</label>
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label>password</label>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button 
        id='login-button'
        type="submit"
      >
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {

  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm