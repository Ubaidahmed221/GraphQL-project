 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");
const author = require("../models/Author");
const Category = require("../models/Category");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {

   const  AutherType = require("../types/AuthorType");
   const  CategoryType = require("../types/CategoryType");
        return {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        authorId: {type: GraphQLID},
        author: {
            type: AutherType,
            resolve(parent, args) {
                return author.findById(parent.authorId); // Fetch author by author ID
            }
        },
        categories:{
            type: new GraphQLList(CategoryType),
            async resolve(parent, args) {
                return Category.find({ _id: { $in: parent.CategoryIds } }); // Fetch categories by CategoryIds
            }
        }
    }}
 });

 module.exports = BookType;