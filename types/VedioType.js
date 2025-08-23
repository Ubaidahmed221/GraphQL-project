 const {GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql");


const VedioType = new GraphQLObjectType({
    name: "Vedio",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        // Add other fields as necessary
    })
  
 });

 module.exports = VedioType;