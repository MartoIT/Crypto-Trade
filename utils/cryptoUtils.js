

exports.isOwner = async (user, crypto) => {
    if(user == undefined) {
        return false;
    }
    return crypto.owner == user._id;
}

// exports.isBuy = (user, crypto) => {
//     return crypto.owner == user._id;
// }