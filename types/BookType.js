 const {GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql");
const author = require("../models/Author");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {

   const  AutherType = require("../types/AuthorType");
        return {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        authorId: {type: GraphQLID},
        author: {
            type: AutherType,
            resolve(parent, args) {
                return author.findById(parent.authorId); // Fetch author by author ID
            }
        }
    }}
 });

 module.exports = BookType;