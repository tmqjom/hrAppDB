import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const JobSchema = new Schema({
  _id: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  isFetch: {
    type: Boolean,
  }
});

export const CandidateSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  jobId: {
    type: String,
  },
  isFetch: {
    type: Boolean,
  }
});

export const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  locked: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
  },
  expiredAt: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now
  }
});
UserSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};


