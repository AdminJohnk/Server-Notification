'use strict';

import { model, Schema, Types } from 'mongoose';
const ObjectId = Types.ObjectId;

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'posts';

const PostSchema = new Schema(
  {
    type: { type: String, enum: ['Post', 'Share'], required: true },
    scope: {
      type: String,
      enum: ['Normal', 'Community'],
      default: 'Normal'
    },
    community: { type: ObjectId, ref: 'Community' },
    visibility: {
      type: String,
      enum: ['public', 'private', 'member', 'friend'],
      default: 'public'
    },

    post_attributes: {
      user: { type: ObjectId, ref: 'User' }, // me_id
      content: String,

      // type = Post
      link: String,
      images: { type: [String], default: [] },

      // type = Share
      post: { type: ObjectId, ref: 'Post' },
      owner_post: { type: ObjectId, ref: 'User' },

      // common field
      like_number: { type: Number, default: 0 },
      save_number: { type: Number, default: 0 },
      share_number: { type: Number, default: 0 },
      comment_number: { type: Number, default: 0 },
      view_number: { type: Number, default: 0 },

      likes: {
        type: [{ type: ObjectId, ref: 'User' }],
        select: false
      },
      shares: {
        type: [{ type: ObjectId, ref: 'User' }],
        select: false
      },
      saves: {
        type: [{ type: ObjectId, ref: 'User' }],
        select: false
      },
      comments: {
        type: [{ type: ObjectId, ref: 'User' }],
        select: false
      },
      hashtags: { type: [String], default: [] }
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

PostSchema.index({ _id: 1, 'post_attributes.user': 1 }, { unique: true });
PostSchema.index({ 'post_attributes.user': 1, createdAt: 1 });
PostSchema.index({ 'post_attributes.view_number': 1, createdAt: -1 });

const PostModel = model(DOCUMENT_NAME, PostSchema);

class PostClass {
 
}

//Export the model
export { PostClass, PostModel };
