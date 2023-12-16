const config = require('./utils/config')
const app = require('./app')

const { info, error, separator } = require('./utils/logger')


const PORT = config.PORT
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})