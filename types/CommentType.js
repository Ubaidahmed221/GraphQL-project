 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLUnionType} = require("graphql");
const PostType = require("../types/PostType");
const VedioType = require("../types/VedioType");
const post = require("../models/Post");
const vedio = require("../models/Vedio");

 const commentableType = new GraphQLUnionType({
    name: "Commentable",
    types: [PostType, VedioType],
    resolveType(value) {
        if (value.content) return "Post";
        if (value.url) return "Vedio"; // match the schema type name
        return null;
    }
});


const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        commenttableId: { type: GraphQLID },
        commentableType: {type: GraphQLString}, // Type of the commentable entity (e.g., Post, Video)
        commentableData:{
            type: commentableType,
            resolve(parent, args) {
                // Logic to fetch the commentable entity based on commenttableId and commentableType
                if (parent.commentableType === "Post") {
                    return post.findById(parent.commenttableId);
                } else if (parent.commentableType === "Vedio") {
                    return vedio.findById(parent.commenttableId);
                }
                return null; // Default case if no type matches
            }
        }
    })
  
 });

 module.exports = CommentType;