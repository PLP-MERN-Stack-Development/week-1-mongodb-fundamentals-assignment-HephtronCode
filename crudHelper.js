// CRUD HELPER FUNCTIONS

const connectDB = require('./db');
const { ObjectId } = require('mongodb');

/*
    * Function to get all books present in the database
    * @returns {Promise<Array>} - A promise that resolves to an array of books
*/
async function getAllBooks() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        // Retrieve all books from the collection
        const result = await books.find({}).toArray();
        console.log('All books retrieved successfully');
        return result;
    } catch (error) {
        console.error('Error retrieving books:', error);
    }
}

// get a spcific book by author name

async function getBookByAuthor(author) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.find({ author }).toArray();
        console.log(`Books by ${author} retrieved successfully`);
        return result;
    } catch (error) {
        console.error(`Error retrieving books by ${author}:`, error);
    }
}

// Find all books in a specific genre

async function getBookByGenre(genre) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.find({ genre }).toArray();
        console.log('Books in genre:', genre, 'retrieved successfully');
        return result;
    } catch (error) {
        console.error(`Error retrieving books in genre ${genre}:`, error);
    }
}

//Find books published after a certain year

async function getBooksPublishedAfter(year) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.find({ published_year: { $gt: year }}).toArray();
        console.log('Books published after', year, 'retrieved successfully');
        return result;
    } catch (error) {
        console.error(`Error retrieving books published after ${year}:`, error);
    }
}

// Update the price of a specific book

async function updateBookPrice(bookId, newPrice) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.updateOne({ _id: ObjectId(bookId) }, { $set: { price: newPrice } });
        console.log(`Book with ID ${bookId} updated successfully`);
        return result;
    } catch (error) {
        console.error(`Error updating book with ID ${bookId}:`, error);
    }
}

// Delete a book by its title

async function deleteBookById(bookId) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.deleteOne({ _id: ObjectId(bookId) });
        console.log(`Book with ID ${bookId} deleted successfully`);
        return result;
    } catch (error) {
        console.error(`Error deleting book with ID ${bookId}:`, error);
    }
}

// Write a query to find books that are both in stock and published after 2010

async function getBooksInStockPublishedAfter(year) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.find({ in_stock: true, published_year: { $gt: year } }).toArray();
        console.log(`Books in stock and published after ${year} retrieved successfully`);
        return result;
    } catch (error) {
        console.error(`Error retrieving books in stock published after ${year}:`, error);
    }
}

// Use projection to return only the title, author, and price fields in your queries

async function getBooksWithProjection() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray();
        console.log('Books with title, author, and price retrieved successfully');
        return result;
    } catch (error) {
        console.error('Error retrieving books with projection:', error);
    }
}

// Implement sorting to display books by price (both ascending and descending)

async function getBooksSortedByPrice(order = 'asc') {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const sortOrder = order === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending
        const result = await books.find({}).sort({ price: sortOrder }).toArray();
        console.log(`Books sorted by price in ${order}ending order retrieved successfully`);
        return result;
    } catch (error) {
        console.error(`Error retrieving books sorted by price in ${order}ending order:`, error);
    }
}

// Use the limit and skip methods to implement pagination (5 books per page)

async function getBooksWithPagination(page = 1, limit = 5) {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const result = await books.find({}).skip(skip).limit(limit).toArray();
        console.log(`Books retrieved for page ${page} with limit ${limit}`);
        return result;
    } catch (error) {
        console.error(`Error retrieving books for page ${page}:`, error);
    }
}

// Create an aggregation pipeline to calculate the average price of books by genre

async function getAveragePriceByGenre() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.aggregate([
            { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
            { $sort: { averagePrice: 1 } } // Sort by average price in ascending order
        ]).toArray();
        console.log('Average price by genre retrieved successfully');
        return result;
    } catch (error) {
        console.error('Error retrieving average price by genre:', error);
    }
}

// Create an aggregation pipeline to find the author with the most books in the collection

async function getAuthorWithMostBooks() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.aggregate([
            { $group: { _id: "$author", bookCount: { $sum: 1 } } },
            { $sort: { bookCount: -1 } }, // Sort by book count in descending order
            { $limit: 1 } // Get the author with the most books
        ]).toArray();
        console.log('Author with the most books retrieved successfully');
        return result;
    } catch (error) {
        console.error('Error retrieving author with the most books:', error);
    }
}

// Implement a pipeline that groups books by publication decade and counts them
async function getBooksByPublicationDecade() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const result = await books.aggregate([
            {
                $group: {
                    _id: { $floor: { $divide: ["$published_year", 10] } }, // Group by decade
                    bookCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by decade in ascending order
        ]).toArray();
        console.log('Books grouped by publication decade retrieved successfully');
        return result;
    } catch (error) {
        console.error('Error retrieving books by publication decade:', error);
    }
}

// Create an index on the title field for faster searches
async function createIndexOnTitle() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        await books.createIndex({ title: 1 }); // Create an index on the title field
        console.log('Index on title field created successfully');
    } catch (error) {
        console.error('Error creating index on title field:', error);
    }
}
    
// Create a compound index on author and published_year
async function createCompoundIndexOnAuthorAndYear() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        await books.createIndex({ author: 1, published_year: 1 }); // Create a compound index on author and published_year
        console.log('Compound index on author and published_year created successfully');
    } catch (error) {
        console.error('Error creating compound index on author and published_year:', error);
    }
}

// Use the explain() method to demonstrate the performance improvement with your indexes

async function explainQueryPerformance() {
    try {
        const db = await connectDB();
        const books = db.collection('books');
        const explainResult = await books.find({ title: 'Some Book Title' }).explain();
        console.log('Query performance explanation:', explainResult);
    } catch (error) {
        console.error('Error explaining query performance:', error);
    }
}
// Exporting all the functions for use in other files
module.exports = {
    getAllBooks,
    getBookByAuthor,
    getBookByGenre,
    getBooksPublishedAfter,
    updateBookPrice,
    deleteBookById,
    getBooksInStockPublishedAfter,
    getBooksWithProjection,
    getBooksSortedByPrice,
    getBooksWithPagination,
    getAveragePriceByGenre,
    getAuthorWithMostBooks,
    getBooksByPublicationDecade,
    createIndexOnTitle,
    createCompoundIndexOnAuthorAndYear,
    explainQueryPerformance
};
