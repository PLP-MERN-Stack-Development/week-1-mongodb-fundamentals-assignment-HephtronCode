[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19659180&assignment_repo_type=AssignmentRepo)
# MongoDB Fundamentals Assignment

This repository contains an assignment designed to introduce you to the fundamentals of MongoDB, including database setup, CRUD operations, advanced querying, aggregation pipelines, and indexing. The project is beginner-friendly and provides step-by-step instructions to help you get started with MongoDB, whether you are using a local installation or MongoDB Atlas.

---

## Assignment Overview

You will learn how to:
1. Set up and connect to a MongoDB database
2. Perform basic CRUD (Create, Read, Update, Delete) operations
3. Write advanced queries using filtering, projection, sorting, and pagination
4. Create aggregation pipelines for data analysis
5. Implement indexing to optimize query performance

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas/database) cloud account)
- **MongoDB Shell** (`mongosh`) or [MongoDB Compass](https://www.mongodb.com/products/compass) (for running queries and exploring your data)

### Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone <your-repo-url>
   cd week-1-mongodb-fundamentals-assignment-HephtronCode
   ```
2. **Install Dependencies**
   If there are any dependencies to install, run:
   ```sh
   npm install
   ```
3. **Set Up MongoDB**
   - For **local installation**, ensure MongoDB is running on your machine.
   - For **MongoDB Atlas**, create a free account and set up a cluster. Whitelist your IP address and create a database user.

4. **Import Sample Data**
   Run the provided `insert_books.js` script to populate your database with sample book data.
   ```sh
   mongo <your-database-url> insert_books.js
   ```

5. **Complete the Assignment Tasks**
   Follow the instructions in the `Week1-Assignment.md` file to complete the tasks.

---

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

---

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)