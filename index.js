require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // Assuming you have a schema.js file

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL interface
}));

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
    });