import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import Knex from 'knex';
import Objection from 'objection';
import register from './controllers/register.js';
import image from './controllers/image.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import recognition from './controllers/recognition.js'

const { Model } = Objection;

// const db = Knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: false,
//     }
// });

const db = Knex({
    client: 'pg',
    connection: {
        connectionString : process.env.POSTGRES_URI,
        ssl : false,
    }
});


Model.knex(db);

// Sets up express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('this is working')
})

app.post('/profile/:id', profile.getUserDetails(db) )

// Sign in request
app.post('/signin', signin.signIn(db, bcrypt))

// Register user request
app.post('/register', register.newUser(db, bcrypt))

// Adds to current count of user entries
app.put('/image', image.updateEntries(db))

// Retrieves Clarifai data for face entries
app.post('/imageurl', image.retrieveData())

// Checks request to see if face descriptors are in database and stores them
app.post('/recognition', recognition.checkAndSetData(db))

// Retrieves all descriptors of requested person
app.post('/descriptors', recognition.retrieveAllUserDescriptors(db))

// Deletes entries of given person
app.delete('/deleteface', image.deleteFaceEntry(db))

// Deletes user from Re-Do
app.delete('/deleteuser', profile.deleteUser(db))

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on Port ${process.env.PORT}`);
});
