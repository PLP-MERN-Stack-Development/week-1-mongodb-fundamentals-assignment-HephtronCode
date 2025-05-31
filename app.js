// importing required modules
const{
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
} = require('./crudHelper');

const command = process.argv[2];

if (command === 'get') {
    getAllBooks().then(books => console.log(books));
} else if (command === 'author') {
    const author = process.argv[3];
    getBookByAuthor(author).then(books => console.log(books));
} else if (command === 'genre') {
    const genre = process.argv[3];
    getBookByGenre(genre).then(books => console.log(books));
} else if (command === 'year') {
    const year = parseInt(process.argv[3], 10);
    getBooksPublishedAfter(year).then(books => console.log(books));
};else if (command === 'update') {
    const bookId = process.argv[3];
    const newPrice = parseFloat(process.argv[4]);
    updateBookPrice(bookId, newPrice).then(result => console.log(result));
}
else if (command === 'delete') {
    const bookId = process.argv[3];
    deleteBookById(bookId).then(result => console.log(result));
}
else if (command === 'in-stock') {
    const year = parseInt(process.argv[3], 10);
    getBooksInStockPublishedAfter(year).then(books => console.log(books));
} else if (command === 'projection') {
    getBooksWithProjection().then(books => console.log(books));
} else if (command === 'sort') {
    getBooksSortedByPrice().then(books => console.log(books));
} else if (command === 'paginate') {
    const page = parseInt(process.argv[3], 10);
    const limit = parseInt(process.argv[4], 10);
    getBooksWithPagination(page, limit).then(books => console.log(books));
} else if (command === 'average-price') {
    getAveragePriceByGenre().then(result => console.log(result));
} else if (command === 'author-most-books') {
    getAuthorWithMostBooks().then(author => console.log(author));
} else if (command === 'decade') {
    const decade = parseInt(process.argv[3], 10);
    getBooksByPublicationDecade(decade).then(books => console.log(books));
} else if (command === 'create-index-title') {
    createIndexOnTitle().then(() => console.log('Index created'));
} else if (command === 'create-compound-index') {
    createCompoundIndexOnAuthorAndYear().then(() => console.log('Compound index created'));
} else if (command === 'explain-performance') {
    explainQueryPerformance().then(result => console.log(result));
} else {
    console.log('Unknown command');
}