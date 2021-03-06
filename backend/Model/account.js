import mongoose from 'mongoose';
const { Schema } = mongoose;
const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastIP: {
      type: String,
    },
    lastLogin: {
      type: String,
      requred: true,
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: 'lastLogin',
    },
    versionKey: false,
  }
);

export default mongoose.model('Account', accountSchema);
