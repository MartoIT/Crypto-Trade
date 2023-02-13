

exports.isOwner = (user, crypto) => {
    return crypto.owner == user._id;
}