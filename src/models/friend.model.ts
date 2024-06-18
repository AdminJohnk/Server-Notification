'use strict';
import { model, Schema, Types } from 'mongoose';
import { getSelectData } from '../utils/function';
import { se_UserDefault } from '../utils/constants';

const ObjectId = Types.ObjectId;

const DOCUMENT_NAME = 'Friend';
const COLLECTION_NAME = 'friends';

const FriendSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

FriendSchema.index({ user: 1, friend: 1 }, { unique: true });

const FriendModel = model(DOCUMENT_NAME, FriendSchema);

class FriendClass {
  static async getAllFriends({ user_id }: { user_id: string }): Promise<any> {
    const user = await FriendModel.findOne({ user: user_id })
      .select('friends')
      .populate({
        path: 'friends',
        select: getSelectData([...se_UserDefault, 'experiences'])
      });
    if (!user) return [];
    return user.friends;
  }
}

export { FriendModel, FriendClass };
