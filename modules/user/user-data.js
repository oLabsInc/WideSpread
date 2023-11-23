<<<<<<< HEAD
const User = require('../../models/User')
const Post = require('../../models/Post')


async function readUserData(currentUserId) {
    const currentUser = await User.findById(currentUserId)
    console.log(currentUser);
    console.log('\n \n \n \n \n ------------------------------------------------------------- \n \n \n \n \n ')
    return currentUser
}
async function getUserPosts(currentUserId) {
    const allUserPosts = await Post.find({"author": {$eq: currentUserId}})
    console.log(allUserPosts);
    return allUserPosts
}

module.exports = {
    readUserData: readUserData,
    getUserPosts: getUserPosts,
=======
const User = require('../../models/User')
const Post = require('../../models/Post')


async function readUserData(currentUserId) {
    const currentUser = await User.findById(currentUserId)
    console.log(currentUser);
    console.log('\n \n \n \n \n ------------------------------------------------------------- \n \n \n \n \n ')
    return currentUser
}
async function getUserPosts(currentUserId) {
    const allUserPosts = await Post.find({"author": {$eq: currentUserId}})
    console.log(allUserPosts);
    return allUserPosts
}

module.exports = {
    readUserData: readUserData,
    getUserPosts: getUserPosts,
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
};