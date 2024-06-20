'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendClass = exports.FriendModel = void 0;
const mongoose_1 = require("mongoose");
const function_1 = require("../utils/function");
const constants_1 = require("../utils/constants");
const ObjectId = mongoose_1.Types.ObjectId;
const DOCUMENT_NAME = 'Friend';
const COLLECTION_NAME = 'friends';
const FriendSchema = new mongoose_1.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    friends: {
        type: [ObjectId],
        ref: 'User',
        index: true,
        default: []
    },
    requestsSent: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    requestsReceived: {
        type: [ObjectId],
        ref: 'User',
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
FriendSchema.index({ user: 1, friend: 1 }, { unique: true });
const FriendModel = (0, mongoose_1.model)(DOCUMENT_NAME, FriendSchema);
exports.FriendModel = FriendModel;
class FriendClass {
    static async getAllFriends({ user_id }) {
        const user = await FriendModel.findOne({ user: user_id })
            .select('friends')
            .populate({
            path: 'friends',
            select: (0, function_1.getSelectData)([...constants_1.se_UserDefault, 'experiences'])
        });
        if (!user)
            return [];
        return user.friends;
    }
}
exports.FriendClass = FriendClass;
//# sourceMappingURL=friend.model.js.map