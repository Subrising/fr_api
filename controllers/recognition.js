// This function gets the request details from the front end which is the user, a detection's name, and its descriptors
// and checks the database to see if this detection already exists. If it does, the descriptor's are appended to the
// current detection in the database which increases the recognition accuracy for that person.
// If the detection does not currently exist, it is added to the database under the given name.
const checkAndSetData = (db) => (req, res) => {
    console.log(req.body.descriptors.descriptor, req.body.descriptors.name, req.body.user_id)
    db.select('*')
        .from('recognised')
        .where('user_id', req.body.user_id)
        .andWhere('name', req.body.descriptors.name)
        .then(results => {
            console.log('1st results = ', results)
            if (results.length) {
                console.log("Person already in database, appending to data")
                console.log("Current descriptors length = ", results[0].descriptors.descriptor.length)
                const desc = Object.values(req.body.descriptors.descriptor)
                results[0].descriptors.descriptor.push(desc)
                console.log("results after update = ", results[0].descriptors.descriptor)
                // THIS WORKS, I JUST NEED TO FIGURE OUT HOW TO APPEND TO DATABASE
                db.update({descriptors: results[0].descriptors})
                .from('recognised')
                .where('name', req.body.descriptors.name)
                .andWhere('name', req.body.descriptors.name)
                .catch(err => res.status(400).json("Failed to add facial recognition descriptors."))

                console.log("CheckAndSetData returning to front end ,", results)
                res.json(results)
            } else {
                console.log("Adding to database ", req.body.descriptors.name)
                const desc = Object.values(req.body.descriptors.descriptor)
                const descObj = {
                    descriptor: [desc]
                }
                db.transaction(trx => {
                    trx.insert({
                        user_id: req.body.user_id,
                        descriptors: descObj,
                        name: req.body.descriptors.name
                    })
                        .into('recognised')
                        .then(trx.commit)
                        .catch(trx.rollback)
                })
                    .catch(err => res.status(400).json("Failed to add facial recognition descriptors."))
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Recognised Descriptors not found...')
        })
}

// This function gets all the detectiions that have been stored for a given user and returns it to the
// Re-Do front end to be used for facial recognition.
const retrieveAllUserDescriptors = (db) => (req, res) => {
    console.log("In here = ", req.body.user_id)
    db.select('name', 'descriptors')
        .from('recognised')
        .where('user_id', req.body.user_id)
        .groupBy('name', 'descriptors')
        .then(results => {
            console.log('2nd results = ', results)
            if (results.length) {
                console.log("RetrieveAllUserDescriptors returning to front end with ", results)
                res.json(results)
            } else {
                throw new Error
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Recognised Descriptors not found...')
        })
}

export default { checkAndSetData, retrieveAllUserDescriptors}
