 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLNonNull} = require("graphql");

const BookType = require("../types/BookType");
const AuthorType = require("../types/AuthorType");
const BookPaginationType = require("../types/BookPaginationType");
const Auther = require("../models/Author");
const Book = require("../models/Book");
const Category = require("../models/Category");
const author = require("../models/Author");
const CategoryType = require("../types/CategoryType");

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
                authorId: { type: GraphQLID },
                CategoryIds: { type: new GraphQLList(GraphQLID) } // Allow multiple category IDs
            },
            resolve(parent, args) {
                const book = new Book({
                    title: args.title,
                    authorId: args.authorId,
                    CategoryIds: args.CategoryIds // Set the category IDs
                });
                return book.save();
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) } // Make name required  
            },
            resolve(parent, args) {
                const category = new Category({
                    name: args.name
                });
                return category.save();
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
            type: BookPaginationType,
            args: {
                page: {type: GraphQLInt},
                authorId: {type: GraphQLID}
            },
         async   resolve(parent, args) {
                const limit = 2; // Number of books per page
                const page = args.page || 1; // Default to page 1
                const offset = (page - 1) * limit; // Calculate offset for pagination
                const filter = {};
                if(args.authorId) filter.authorId = args.authorId; // Filter by author ID if provided
                const totalCount = await Book.countDocuments(filter); // Get total count of books
                const totalPages = Math.ceil(totalCount / limit); // Calculate total pages
                
                const books = await Book.find(filter).skip(offset).limit(limit); // Fetch all books from the database
                return {
                    books: books,
                    totalPages: totalPages,
                    currentPage: page,
                    hasNextPage: page < totalPages ? "true" : "false",
                    hasPreviousPage: page > 1 ? "true" : "false"
                };
            }
        },
        category:{
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Category.findById(args.id); // Fetch category by ID
            }
        },
          categories:{
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find(); // Fetch category by ID
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})