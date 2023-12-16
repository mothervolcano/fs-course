import './index.css'

import { useState, useEffect, useRef } from 'react'
import Notification from './components/notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {

  const [notificationMessage, setNotificationMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  // -------------------------------------------------
  // HOOKS

  useEffect(() => {

    const loggedUserData = window.localStorage.getItem('loggedUser')

    if (loggedUserData) {

      const user = JSON.parse(loggedUserData)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  
  useEffect(() => {

    if (user) {

      const fetchBlogs = async () => {
        await updateBlogs()
      }

      fetchBlogs() 
    }

    
  }, [user])


  // -------------------------------------------------
  // HANDLERS

  const handleLogin = async (event) => {

    event.preventDefault()
    console.log('logging in with', username, password)

    try {

      const user = await loginService.login({
        username, 
        password
      })

      console.log('@handleLogin: ', user.token)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      console.log('logged user: ', user)

    } catch (exception) {

      setNotificationMessage({ type: 'ERROR', content: "invalid username or password" })

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }


  const handleLogout = async (event) => {

    event.preventDefault()
    console.log('logging out', user.name)

    try {

      window.localStorage.clear()
      blogService.setToken(null)

      setUser(null)

    } catch (exception) {

      setNotificationMessage({ type: 'ERROR', content: "Failed to log out" })

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }


  const addBlog = async (newBlog) => {

    console.log('add new blog: ', newBlog)

    try {

      blogFormRef.current.toggleVisibility()

      const savedBlog = await blogService.create(newBlog)

      console.log('@app.addBlog: ', savedBlog.user)

      // setBlogs(blogs.concat(savedBlog))

      updateBlogs()

      setNotificationMessage({ type: 'INFO', content: `Added ${savedBlog.title} to ${user.name}'s blog list` })

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {

      setNotificationMessage({ type: 'ERROR', content: `Failed to add blog. Error: ${exception}` })

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const addLike = async (updatedBlog) => {

    // console.log('@App.addLike: ', updatedBlog.likes )

    await blogService.update(updatedBlog)

    updateBlogs()
  }

  const deleteBlog = async (blog) => {

    if (window.confirm(`Are you sure you want to delete blog ${blog.title}?`)) {

      await blogService.deleteEntry(blog.id)

      updateBlogs()
    } 
  }


  const updateBlogs = async () => {

    const blogs = await blogService.getAll()

    blogs.sort((a, b) => b.likes - a.likes)

    setBlogs(blogs)

    // console.log('@App.updateBlogs: ', blogs)
  }

  // -------------------------------------------------
  // COMPONENTS


  const loginForm = () => {

    return (
      
      <Togglable buttonLabel='log in'>
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogFormRef = useRef()

  const blogForm = () => (

    <Togglable buttonLabel='add blog' ref={blogFormRef}>

      <BlogForm 
        onSubmit={addBlog}
      />

    </Togglable>


  )

  const blogList = () => (

    <>

      { blogs.map(blog => {

          if ( blog.user.username === user.username ) {

            return (<Blog key={blog.id} blog={blog} onLike={addLike} onDelete={deleteBlog} />)

          } else {

            return (<Blog key={blog.id} blog={blog} onLike={addLike} />)
          }

        }    

      ) }

    </>
  )


  return (

    <div>
      <h2>Blogs</h2>

      <Notification message={notificationMessage} />

      {user === null && loginForm()}
      {user !== null && 
        <div>
          <p>{user.name} logged <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>}
      {user !== null && blogList()}

    </div>
  )
}

export default App