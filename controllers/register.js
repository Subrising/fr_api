const saltRounds = 10;

// Hashes a password to store for the user in the database
async function hashPassword(password, bcrypt) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    console.log('hashedPWD ', hashedPassword)

    return hashedPassword
}

// Uses the data given to check to see if a user exists in the database
// If not, a hash for the password is created and a new database transaction is
// made storing the new user
const newUser = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json("Invalid input");
    }
    hashPassword(password, bcrypt).then(hash => {
        console.log(hash, email, name, password)
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    console.log("LoginEmail = ", loginEmail)
                    return trx.insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                        .into('users')
                        .returning('*')
                        .then(user => {
                            console.log(user[0])
                            res.json(user[0])
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err =>  {
                console.log("Error = ", err)
                res.status(400).json("Failed to register. User/Email may already exist.")
            })
    })
}

export default {newUser};
