import mongoose from "mongoose";
import { JobSchema, CandidateSchema, UserSchema } from "../models/model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const Job = mongoose.model("Job", JobSchema);

export const addJob = (req, res) => {
  const { _id, jobTitle, jobDescription, employmentType } = req.body;

  Job.findOneAndUpdate(
    { _id },
    { jobTitle, jobDescription, employmentType },
    { upsert: true, new: true },
    (err, job) => {
      if (err) {
        res.send(err);
      }
      res.json(job);
    }
  );

  // newJob.save((err, job) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(job);
  // });
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
  const { _id, name, email, phone, jobId } = req.body;

  Candidate.findOneAndUpdate(
    { _id },
    { name, email, phone, jobId },
    { upsert: true, new: true },
    (err, candidate) => {
      if (err) {
        res.send(err);
      }
      res.json(candidate);
    }
  );
  // newCandidate.save((err, candidate) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(candidate);
  // });
};

export const fetchCandidate = (req, res) => {
  Candidate.find({}, (err, candidate) => {
    if (err) {
      res.send(err);
    }
    res.json(candidate);
  });
};

const User = mongoose.model("User", UserSchema);

export const register = (req, res) => {
  var newUser = new User(req.body);

  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }, async function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) return res.json({ message: 'Authentication failed. User not found.' });

    if (user.locked) {
      return res.json({ message: 'User is locked. Please contact admin to unlock.' });
    }
    if (!user.comparePassword(req.body.password)) {
      await User.findOneAndUpdate({ email: req.body.email }, { $inc: { loginAttempts: 1 } }, { upsert: true, new: true });

      if (user && user.loginAttempts >= 3) {
        await User.findOneAndUpdate({ email: req.body.email }, { locked: true }, { upsert: true, new: true });
        return res.json({ message: 'Account locked. Please contact the administrator.' });
      }
      return res.json({ message: `Authentication failed. Invalid user or password. Log in attempts: ${user.loginAttempts ? user.loginAttempts + 1 : 1}`, });
    }

    if (user.loginAttempts > 0) {
      await User.findOneAndUpdate({ email: req.body.email }, { $set: { loginAttempts: 0 } });
    }
    res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
  });
};

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({ message: 'Unauthorized user!!' });
  }
};