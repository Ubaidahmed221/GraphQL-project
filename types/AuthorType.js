 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");
const BookType = require("../types/BookType");
const Book = require("../models/Book");

const AutherType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id }); // Fetch books by author ID
            }
        }
    })
 });

 module.exports = AutherType;