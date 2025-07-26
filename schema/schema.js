const {GraphiQL, GraphQLObjectType, GraphQLSchema, GraphQLString, graphql, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull} = require('graphql');
 const User = require("../models/user");

 const userType = new GraphQLObjectType({
    name: "user",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },

    }
});

const UserInputType = new GraphQLInputObjectType({
    name: "userInput",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
    }
});

 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return User.find(); // Fetch all users from the database
            }
        },
        user: {
            type: userType,
            args: { id: { type: GraphQLString } }, 
            resolve(parent,args){
             return   User.findById(args.id);
            }
        },
    }
});

// mutation type working
const Mutation =  new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser:{
            type: userType,
        args: {
            input: { type: UserInputType }
        },
         async   resolve(_,{ input }) {
            if(!input.name || input.name.length < 3) {
                throw new Error("Name must be at least 3 characters long");

            }
             const user = new User({
                name: input.name,
                age: input.age
              }); // Save new user to the database
          return  await  user.save();
            }


        },
         updateUser:{
            type: userType,
            args:{
                id:{type: GraphQLString},
                name:{type: GraphQLString},
                age:{type: GraphQLInt},

            },
          async  resolve(parent, args) {
            return await    User.findByIdAndUpdate(args.id, {
                    name: args.name, 
                    age: args.age       
            },{ new: true });
        
        }
    },
         // delete user
         deleteUser:{
            type: userType,
            args:{
                id:{type: GraphQLString},
            },
        async    resolve(parent, args) {
             return await  User.findByIdAndDelete(args.id);


           }
         }
        
    }
    
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});