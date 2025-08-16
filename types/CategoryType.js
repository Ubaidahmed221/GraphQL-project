 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");

 const Book = require("../models/Book");

const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => {
        const BookType = require("../types/BookType");
        return {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
       Books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return Book.find({ CategoryIds: parent.id }); // Fetch books by category ID
            }
       } 
    }}
 });

 module.exports = CategoryType;