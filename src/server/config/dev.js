const config = {
    // dbUrl: `mongodb+srv://ashishs104:Arsenal%401886@cluster0.tr5qs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    dbUrl: `${process.env.MONGO_URI}`
}

module.exports = config;
// || `${process.env.MONGO_URI}`

// mongodb+srv://ashishs104:Arsenal%401886@cluster0.tr5qs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority