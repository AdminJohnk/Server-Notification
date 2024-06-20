"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotiEnumMongoose = exports.Notification = void 0;
exports.Notification = {
    // ==================== One to One ====================
    LIKEPOST_001: {
        type: 'LIKEPOST_001',
        kind: 'one_to_one',
        content: 'liked your post'
    },
    SHAREPOST_001: {
        type: 'SHAREPOST_001',
        kind: 'one_to_one',
        content: 'shared your post'
    },
    SENDFRIENDREQUEST_001: {
        type: 'SENDFRIENDREQUEST_001',
        kind: 'one_to_one',
        content: 'sent you a friend request'
    },
    ACCEPTFRIENDREQUEST_001: {
        type: 'ACCEPTFRIENDREQUEST_001',
        kind: 'one_to_one',
        content: 'accepted your friend request'
    },
    COMMENTPOST_001: {
        type: 'COMMENTPOST_001',
        kind: 'one_to_one',
        content: 'commented on your post'
    },
    REPLYCOMMENT_001: {
        type: 'REPLYCOMMENT_001',
        kind: 'one_to_one',
        content: 'replied to your comment'
    },
    LIKECOMMENT_001: {
        type: 'LIKECOMMENT_001',
        kind: 'one_to_one',
        content: 'liked your comment'
    },
    // ==================== One to Many ====================
    CREATEPOST_001: {
        type: 'CREATEPOST_001',
        kind: 'one_to_many',
        content: 'created a post'
    }
};
exports.NotiEnumMongoose = Object.keys(exports.Notification);
//# sourceMappingURL=notificationType.js.map