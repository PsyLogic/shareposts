module.exports = {
    Query: {
        getPosts: (_, args, {Post}) => Post
                                        .find({})
                                        .sort({createdAt: 'desc'})
                                        .populate({
                                            path: 'createdBy',
                                            model: 'User'
                                        }),
        
    },
    Mutation: {
        addPost: async (_, {title, imageUrl, categories, description, createdBy}, {Post}) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy
            }).save()

            return newPost.populate({
                path: 'createdBy',
                model: 'User'
            })
        },
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