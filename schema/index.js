 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema} = require("graphql");

const BookType = require("../types/BookType");
const AuthorType = require("../types/AuthorType");
const Auther = require("../models/Author");
const Book = require("../models/Book");
const author = require("../models/Author");

 const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                const author = new Auther({
                    name: args.name
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const book = new Book({
                    title: args.title,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Auther.find(); // Fetch all authors from the database
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find(); // Fetch all books from the database
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})