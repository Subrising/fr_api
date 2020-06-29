// Uses BCRYPT checking functions to compare a given password to the password stored in our database for the user
// Returns true if the checked password is the same as the BCRYPT stored hash
async function checkUser(userHash, password, bcrypt) {
    const userCheck = await new Promise((resolve, reject) => {
        bcrypt.compare(password, userHash, function (err, res) {
            if (err) reject(err)
            resolve(res)
        });
    })
    console.log(userCheck)
    return userCheck
}

// Checks to see if the user details are in the database and are correct
// If yes, the user is signed in to Re-Do
const signIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    db.select('email', 'hash')
        .from('login')
        .where('email', email)
        .returning('hash')
        .then(hash => {
            checkUser(hash[0].hash, password, bcrypt)
                .then(userExists => {
                    if (userExists) {
                        return db.select('*')
                            .from('users')
                            .where('email', email)
                            .then(user => res.json(user[0]))
                            .catch(err => res.status(400).json('Unable to retrieve user...'))
                    } else {
                        console.log("The fuck")
                        throw new Error
                    }
                })
                .catch(err => res.status(400).json('Incorrect e-mail or password...'))
        })
        .catch(err => res.status(400).json('Incorrect e-mail or password...'))
}

export default {signIn};
