import {
  addJob,
  fetchJob,
  addCandidate,
  fetchCandidate,
} from "../controllers/controller.js";

export const routes = (app) => {
  app
    .route("/api/job")
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, fetchJob)
    .post(addJob);

  app
    .route("/api/candidate")
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, addCandidate)
    .post(fetchCandidate);
};


