const express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://127.0.0.1:/authDemo')
.then(() => {console.log('Connected to MongoDB')})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Reached Home Page')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    // res.send(req.body)
    const {password, username} = req.body
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        username,
        password: hash
    })
    await user.save()
    res.redirect('/')
})

app.post('/login', async(req, res) => {
    // res.send(req.body)
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    const compare = await bcrypt.compare(password, user.password)
    if(compare){
        res.send(`Welcome ${username}`)
    } else {
        res.send('Try Again')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/secret', (req, res) => {
    res.send('This is secret. You Cannot See Me Unless You\'re Logged In.')
})


app.listen(3000, () => {
    console.log('Connected to 3000!')
})