import Clarifai from 'clarifai';

const clarifai = new Clarifai.App({
    apiKey: 'c98aca35c9b14555b67b187360ae51f2'
});

// Retrieves image facial data from Clarifai
const retrieveData = () => (req, res) => {
    console.log(req.body.imageUrl)
    clarifai.models
        .predict(
            Clarifai.FACE_EMBED_MODEL,
            req.body.imageUrl)
            .then(response => res.json(response))
            .catch(err => res.status(400).json("Unable to retrieve data from Clarifai"))
}

// Adds 1 to the entry count when an image has been requested
const updateEntries = (db) => (req, res) => {
    const { id } = req.body
    db('users')
        .where('id', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json("Error getting entries"))
}

// Deletes a specific person from the database from the user
// Useful for when a user no longer wants their descriptors for a person to be tracked.
const deleteFaceEntry = (db) => (req, res) => {
    const { user_id, name } = req.body
    console.log("Deleting from database, ", name)
    db('recognised')
        .where('user_id', user_id)
        .andWhere('name', name)
        .del()
        .catch(err => res.status(400).json("Error deleting entry"))
}

export default { updateEntries, retrieveData, deleteFaceEntry};
