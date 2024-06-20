'use strict';

import { model, Schema, Types } from 'mongoose';
import { NotiEnumMongoose } from '../utils/notificationType';
import { pp_UserDefault } from '../utils/constants';
const ObjectId = Types.ObjectId;

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'notifications';

const NotificationSchema = new Schema(
  {
    type: { type: String, enum: NotiEnumMongoose, required: true },
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
  },
  {
    collection: COLLECTION_NAME
  }
);

// time to expire
NotificationSchema.index({ createAt: 1 }, { expireAfterSeconds: 86400 * 14 });

const NotiModel = model(DOCUMENT_NAME, NotificationSchema);

class NotiClass {
  static async getNotiByID(notiID: string) {
    return await NotiModel.findById(notiID)
      .populate('sender', pp_UserDefault)
      .populate('receiver', pp_UserDefault)
      .lean();
  }
  static async createNotify(payload: any) {
    return await NotiModel.create(payload);
  }
}

export { NotiModel, NotiClass };
