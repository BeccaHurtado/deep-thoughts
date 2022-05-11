const { User, Thought } = require('../models');

const resolvers = {
    Query: {

        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },

        // parent is a placeholder to access the username as a second parameter.
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            // returning the data in descending order.
            // passing object with or without data in it.
            return Thought.find(params).sort({ createdAt: -1 })
        },
        
        // get a thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id })
        }
    }
};

module.exports = resolvers;