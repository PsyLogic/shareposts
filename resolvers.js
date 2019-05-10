module.exports = {
    Query: {
        getUser: () => {
            return null
        }
    },
    Mutation: {
        signupUser: async (_, {username, email, password}, {User}) => {
            const user = await User.findOne({username})
            if(user){
                throw new Error('User alrady exists')
            }
            
            const newUser = await new User({
                username,
                email,
                password
            }).save()

            return newUser
        }
    }
}