use plp_bookstore;

// Task 2: Basic Queries

// 1. Find all books in a specific genre
db.books.find(
  { genre: "Fiction" }, 
  { title: 1, author: 1, price: 1 }
);

// 2. Find books published after a certain year
db.books.find(
  { published_year: { $gt: 2015 } },
  { title: 1, author: 1, price: 1 }
);

// 3. Find books by a specific author
db.books.find(
  { author: "George Orwell" }, 
  { title: 1, author: 1, price: 1 }
);

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "The Hobbit" }, 
  { $set: { price: 17.99 } } 
);

// 5. Delete a book by its title
db.books.deleteOne(
  { title: "Moby Dick" } 
);

// Task 3: Advanced Queries

// 1. Find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1 }
);

// 2. Projection is already used above (title, author, price)

// 3. Sorting by price ascending
db.books.find({}, { title: 1, author: 1, price: 1 }).sort({ price: 1 });

// 4. Sorting by price descending
db.books.find({}, { title: 1, author: 1, price: 1 }).sort({ price: -1 });

// 5. Pagination: 5 books per page, page 2 (skip first 5)
db.books.find({}, { title: 1, author: 1, price: 1 }).skip(5).limit(5);

// Task 4: Aggregation Pipeline

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
        "s"
      ] },
      count: { $sum: 1 }
    }
  }
]);

// Task 5: Indexing

// 1. Create an index on the title field
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3. Use explain() to show performance improvement
db.books.find({ title: "The Hobbit" }).explain("executionStats");
db.books.find({ author: "George Orwell", published_year: 1949 }).explain("executionStats");
