const express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:/authDemo')
.then(() => {console.log('Connected to MongoDB')})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(session({secret: 'notagoodsecret'}))

const requireLogin = (req, res, next) => {
    if(!req.session.user_id){
        return res.redirect('/login')
    }
        next();
    }

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
    req.session.user_id = user._id
    res.redirect('/')
})

app.post('/login', async(req, res) => {
    // res.send(req.body)
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    const compare = await bcrypt.compare(password, user.password)
    if(compare){
        req.session.user_id = user._id
        res.redirect(`/secret`)
    } else {
        res.redirect(`/login`)
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null
    req.session.destroy()
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    // if(req.session.user_id === null){
        res.render('login')
    // } else {
        // res.redirect('/secret')
    // }
    
})

app.get('/secret', requireLogin, (req, res) => {
        res.render('secret')
})


app.listen(3000, () => {
    console.log('Connected to 3000!')
})