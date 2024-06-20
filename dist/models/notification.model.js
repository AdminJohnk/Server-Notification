'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotiClass = exports.NotiModel = void 0;
const mongoose_1 = require("mongoose");
const notificationType_1 = require("../utils/notificationType");
const constants_1 = require("../utils/constants");
const ObjectId = mongoose_1.Types.ObjectId;
const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'notifications';
const NotificationSchema = new mongoose_1.Schema({
    type: { type: String, enum: notificationType_1.NotiEnumMongoose, required: true },
    sender: { type: ObjectId, ref: 'User', required: true },
    receiver: { type: ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    is_pushed: { type: Boolean, default: false },
    options: {
        type: {
            post: { type: ObjectId, ref: 'Post' },
            friend: { type: ObjectId, ref: 'User' }
        },
        default: {}
    },
    createAt: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME
});
// time to expire
NotificationSchema.index({ createAt: 1 }, { expireAfterSeconds: 86400 * 14 });
const NotiModel = (0, mongoose_1.model)(DOCUMENT_NAME, NotificationSchema);
exports.NotiModel = NotiModel;
class NotiClass {
    static async getNotifyUnRead(receiver) {
        return await NotiModel.find({ receiver, is_read: false })
            .populate('sender', constants_1.pp_UserDefault)
            .populate('receiver', constants_1.pp_UserDefault)
            .lean();
    }
    static async getNotiByID(notiID) {
        return await NotiModel.findById(notiID)
            .populate('sender', constants_1.pp_UserDefault)
            .populate('receiver', constants_1.pp_UserDefault)
            .lean();
    }
    static async createNotify(payload) {
        return await NotiModel.create(payload);
    }
}
exports.NotiClass = NotiClass;
//# sourceMappingURL=notification.model.js.map