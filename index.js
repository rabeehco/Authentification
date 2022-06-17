const bcrypt = require('bcrypt')

const hashPass = async() => {
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
}

hashPass()