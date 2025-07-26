 const {GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql");
const author = require("../models/Author");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        authorId: {type: GraphQLID}
    })
 });

 module.exports = BookType;