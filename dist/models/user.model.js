'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserClass = exports.RoleUser = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
Object.defineProperty(exports, "RoleUser", { enumerable: true, get: function () { return constants_1.RoleUser; } });
const ObjectId = mongoose_1.Types.ObjectId;
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';
const UserSchema = new mongoose_1.Schema({
    id_incr: { type: Number, default: 0, index: true },
    name: {
        type: String,
        trim: true,
        maxLength: 150,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: { type: String },
    role: Array,
    last_online: { type: Date, default: Date.now },
    reputation: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    // ==================================================
    phone_number: Number,
    user_image: { type: String, default: constants_1.avt_default },
    cover_image: String,
    verified: { type: Boolean, default: false },
    tags: [{ type: String }],
    alias: { type: String, trim: true, default: '' },
    about: String,
    post_series: { type: Array, default: [] },
    /*
      {
        series_id: ObjectId,
        post_id: ObjectId
      }
    */
    experiences: { type: Array, default: [] },
    /*
      {
        positionName: String,
        companyName: String,
        startDate: String,
        endDate: String
      }
    */
    repositories: { type: Array, default: [] },
    /*
    {
        id: Number,
        name: String,
        private: Boolean,
        url: String,
        watchersCount: Number,
        forksCount: Number,
        stargazersCount: Number,
        languages: String
      }
    */
    contacts: { type: Array, default: [] },
    location: String,
    favorites: {
        type: [{ type: ObjectId, ref: 'Post' }],
        default: []
    },
    favorite_questions: {
        type: [{ type: ObjectId, ref: 'Question' }],
        default: []
    },
    communities: {
        type: [{ type: ObjectId, ref: 'Community' }],
        default: []
    },
    notifications: {
        type: [{ type: ObjectId, ref: 'Notification' }],
        default: []
    },
    category_favorite_questions: {
        type: [
            {
                name: String,
                questions: [{ type: ObjectId, ref: 'Question' }]
            }
        ],
        default: []
    },
    // Number
    post_number: { type: Number, default: 0 },
    community_number: { type: Number, default: 0 },
    unread_noti_number: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
UserSchema.index({ name: 'text', email: 'text', alias: 'text' });
const UserModel = (0, mongoose_1.model)(DOCUMENT_NAME, UserSchema);
exports.UserModel = UserModel;
class UserClass {
    static async setPlusUnRedNotiNumber(userID) {
        return await UserModel.findByIdAndUpdate(userID, {
            $inc: { unread_noti_number: 1 }
        });
    }
}
exports.UserClass = UserClass;
//# sourceMappingURL=user.model.js.map