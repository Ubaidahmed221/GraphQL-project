 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");
const BookType = require("../types/BookType");


const AutherType = new GraphQLObjectType({
    name: "Author",
    fields: () => {
        const Book = require("../models/Book");
        return {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id }); // Fetch books by author ID
            }
        }
    }}
 });

 module.exports = AutherType;