 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");

 const Book = require("../models/Book");
    const Category = require("../models/Category");

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
       },
       parentCategory: {
            type: CategoryType,
            resolve(parent, args) {
             return  parent.parentCategory ? Category.findById(parent.parentCategory) : null; // Fetch parent category if exists
            }
        },
        subcategories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find({ parentCategory: parent.id }); // Fetch subcategories by parent category ID
            }
        } 
    }}
 });

 module.exports = CategoryType;