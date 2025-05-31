// connecting to MongoDB using Native Driver
// This code connects to a MongoDB database using the native MongoDB driver.
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const dbName = 'plp_bookstore';
const booksCollection = 'books';

async function connectDB() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection(booksCollection);

        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;