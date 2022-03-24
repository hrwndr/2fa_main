require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 2222

const app = express()

app.use(cors())
app.use(express.json())

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const checkRoute = require('./routes/check')
const verifyRoute = require('./routes/verifyCode')
const verifyTokenRoute = require('./routes/verifyAuthToken')


// Routes
app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/api', checkRoute)
app.use('/api', verifyRoute)
app.use('/api', verifyTokenRoute)

app.get('/', (req, res) => {
    res.sendFile(path.join('client', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))