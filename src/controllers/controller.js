import mongoose from "mongoose";
import { JobSchema, CandidateSchema } from "../models/model.js";

const Job = mongoose.model("Job", JobSchema);

export const addJob = (req, res) => {
  let newJob = new Job(req.body);

  newJob.save((err, job) => {
    if (err) {
      res.send(err);
    }
    res.json(job);
  });
};

export const fetchJob = (req, res) => {
  Job.find({}, (err, job) => {
    if (err) {
      res.send(err);
    }
    res.json(job);
  });
};

const Candidate = mongoose.model("Candidate", CandidateSchema);

export const addCandidate = (req, res) => {
  let newCandidate = new Candidate(req.body);

  newCandidate.save((err, candidate) => {
    if (err) {
      res.send(err);
    }
    res.json(candidate);
  });
};

export const fetchCandidate = (req, res) => {
  Candidate.find({}, (err, candidate) => {
    if (err) {
      res.send(err);
    }
    res.json(candidate);
  });
};

