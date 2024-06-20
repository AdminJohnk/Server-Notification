"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_EVENTS = exports.objectConnectRedis = exports.REDIS_PASSWORD = exports.REDIS_USERNAME = exports.REDIS_PORT = exports.REDIS_HOST = exports.unSe_PostDefault = exports.se_UserDefaultForPost = exports.se_UserDefault = exports.pp_UserDefault = exports.avt_default = exports.RoleUser = void 0;
exports.RoleUser = {
    USER: '0000',
    ADMIN: '0101'
};
exports.avt_default = 'https://res.cloudinary.com/dp58kf8pw/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694576962/default_avatar_ixpwcf.jpg';
exports.pp_UserDefault = '_id name email user_image last_online';
exports.se_UserDefault = ['_id', 'name', 'email', 'user_image', 'last_online'];
exports.se_UserDefaultForPost = [
    '_id',
    'name',
    'email',
    'user_image',
    'experiences',
    'follower_number',
    'following_number',
    'post_number'
];
exports.unSe_PostDefault = [
    'post_attributes.likes',
    'post_attributes.shares',
    'post_attributes.saves',
    'updatedAt',
    '__v'
];
_a = process.env, exports.REDIS_HOST = _a.REDIS_HOST, exports.REDIS_PORT = _a.REDIS_PORT, exports.REDIS_USERNAME = _a.REDIS_USERNAME, exports.REDIS_PASSWORD = _a.REDIS_PASSWORD;
exports.objectConnectRedis = {
    username: exports.REDIS_USERNAME,
    password: exports.REDIS_PASSWORD,
    socket: {
        host: exports.REDIS_HOST,
        port: exports.REDIS_PORT
    }
};
exports.SOCKET_EVENTS = {
    SETUP: 'SETUP',
    // =================== Chat ===================
    PRIVATE_MSG: 'PRIVATE_MSG',
    SEEN_MSG: 'SEEN_MSG',
    UNSEEN_MSG: 'UNSEEN_MSG',
    PRIVATE_CONVERSATION: 'PRIVATE_CONVERSATION',
    NEW_CONVERSATION: 'NEW_CONVERSATION',
    IS_TYPING: 'IS_TYPING',
    STOP_TYPING: 'STOP_TYPING',
    LEAVE_GROUP: 'LEAVE_GROUP',
    DISSOLVE_GROUP: 'DISSOLVE_GROUP',
    CHANGE_CONVERSATION_NAME: 'CHANGE_CONVERSATION_NAME',
    CHANGE_CONVERSATION_IMAGE: 'CHANGE_CONVERSATION_IMAGE',
    ADD_MEMBER: 'ADD_MEMBER',
    REMOVE_MEMBER: 'REMOVE_MEMBER',
    COMMISSION_ADMIN: 'COMMISSION_ADMIN',
    DECOMMISSION_ADMIN: 'DECOMMISSION_ADMIN',
    VIDEO_CALL: 'video',
    VOICE_CALL: 'audio',
    LEAVE_VIDEO_CALL: 'leave_video',
    LEAVE_VOICE_CALL: 'leave_audio',
    END_VIDEO_CALL: 'end_video',
    END_VOICE_CALL: 'end_audio',
    SEND_END_VIDEO_CALL: 'send_end_video',
    SEND_END_VOICE_CALL: 'send_end_audio',
    // =================== Notification ===================
    NOTI_ARR: 'NOTI_ARR',
    NOTI: 'NOTI',
};
// export {
//   avt_default,
//   se_UserDefault,
//   pp_UserDefault,
//   se_UserDefaultForPost,
//   objectConnectRedis,
//   unSe_PostDefault,
//   SOCKET_EVENTS
// };
//# sourceMappingURL=constants.js.map