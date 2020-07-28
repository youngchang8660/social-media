const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profileImage: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    chat_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'chat'
        }
    ],
    friendList: [{
        friend_name: {}
    }],
    status: { type: String }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);