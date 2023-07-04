import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const JobSchema = new Schema({
  _id: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  address: {
    type: String,
  },
  insight: {
    type: String,
  },
  company: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  applicantCount: {
    type: Number,
  },
  viewCount: {
    type: Number,
  },
  result: {
    type: Number,
  }
});

export const CandidateSchema = new Schema({
  _id: {
    type: String,
  },
  fullName: {
    type: String,
  },
  emails: {
    type: Array,
  },
  phoneNumbers: {
    type: Array,
  },
  jobId: {
    type: String,
  },
  isFetch: {
    type: Boolean,
  }
});

