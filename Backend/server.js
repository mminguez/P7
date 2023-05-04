require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bookRoutes = require('./routes/api/books')
const loginRoutes = require('./routes/api/logins')
const signupRoutes = require('./routes/api/signups')

app.use(cors({
    origin: ['http://localhost:3000', 'https://example.com'],
    credentials: true,
}))

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB database Connected...'))
.catch((err) => console.log(err))

app.use(express.json())
app.use('/api/books', bookRoutes)
app.use('/api/auth/login', loginRoutes)
app.use('/api/auth/signup', signupRoutes)
app.get('/', (req, res) => res.send('Seems to work... :)'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
