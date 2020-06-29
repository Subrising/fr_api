const getUserDetails = () => (req, res) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where('id', id)
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                throw new Error
            }
        })
        .catch(err => res.status(400).json('User not found...'))

}

// Deletes the user and their associated data from each of the tables in the database
const deleteUser = (db) => (req, res) => {
    const { user } = req.body
    console.log("User to delete = ", user)
    db('recognised')
        .where('user_id', user.id)
        .del()
        .catch(err => res.status(400).json("Error deleting entry"))

    db('login')
        .where('email', user.email)
        .del()
        .catch(err => res.status(400).json("Error deleting entry"))

    db('users')
        .where('id', user.id)
        .del()
        .catch(err => res.status(400).json("Error deleting entry"))
}

export default { getUserDetails, deleteUser };
