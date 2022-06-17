const bcrypt = require('bcrypt')

// const hashPass = async(pw) => {
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(salt)
//     console.log(hash)
// }

const hashPass = async(pw) => {
    const hash = await bcrypt.hash(pw, 12)
    // console.log(salt)
    console.log(hash)
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
    if(result){
        console.log('Pass Matched')
    } else {
        console.log('Pass Not Matched!!!')
    }
}

// hashPass('monkey')
login('monkey', '$2b$12$/uBNVEahSMbq4RxXzWtSYupetRdLtHQxTdZgzKNJDvzPDQkO6VZBO')
