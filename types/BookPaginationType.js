 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList,GraphQLInt} = require("graphql");

const BookPaginationType = new GraphQLObjectType({
    name: "BookPaginationType",
    fields: () => {
        const BookType = require("./BookType");
        return {
            books: {type: new GraphQLList(BookType)},
            totalPages: {type: GraphQLInt},
            currentPage: {type: GraphQLInt},
            hasNextPage: {type: GraphQLString},
            hasPreviousPage: {type: GraphQLString}
        }
    }
   
 });

 module.exports = BookPaginationType;